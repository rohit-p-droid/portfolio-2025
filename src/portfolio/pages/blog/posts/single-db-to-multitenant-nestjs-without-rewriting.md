
You didn't plan for this. The app started small, a clean single-database setup, and the client said "it won't grow that big." Then it did. Now you're staring at a production app with organizations, users, AI agents, RAG pipelines, and background jobs all sharing one database, and the client wants proper data isolation.

This is exactly what happened to me. Here's the full story of how I migrated a NestJS + Mongoose documentation platform to a multi-tenant architecture with minimal changes to existing business logic.

## The Problem

Each organization needed strict data isolation. Their users, documents, and agent configs had to be completely invisible to other organizations.

I had already added a `companyId` check to every query. It worked, but it was fragile. Easy to miss in a new query, hard to audit across hundreds of service methods. The right fix was database-level isolation: one database per tenant.

## The Architecture

Rather than touching every service and repository, I built a Tenant Module that intercepts requests, resolves the correct database connection, and injects it transparently into Mongoose models. The beauty of this approach is that existing service code does not need to change at all.

Here is the high-level flow:

```
Incoming HTTP Request
       |
TenantInterceptor        (reads companyId from JWT or header)
       |
TenantContextService     (stores tenantId in AsyncLocalStorage)
       |
TenantConnectionService  (resolves and caches DB connection for tenant)
       |
TenantMongooseModule     (provides correct connection to models)
       |
Your Service/Repository  (unchanged, queries correct tenant DB)
```

## Step 1: Tenant Context with AsyncLocalStorage

The key to passing tenant context without threading it through every function call is `AsyncLocalStorage`, which is Node's built-in mechanism for request-scoped context.

```typescript
// tenant-context.ts
import { AsyncLocalStorage } from 'async_hooks';

export interface TenantStore {
  tenantId: string;
}

export const tenantStorage = new AsyncLocalStorage<TenantStore>();
```

```typescript
// tenant-context.service.ts
import { Injectable } from '@nestjs/common';
import { tenantStorage } from './tenant-context';

@Injectable()
export class TenantContextService {
  getTenantId(): string {
    const store = tenantStorage.getStore();
    if (!store || !store.tenantId) {
      throw new Error('Tenant context is not set for this request');
    }
    return store.tenantId;
  }
}
```

**Why not use REQUEST scope in NestJS?**

NestJS's `scope: Scope.REQUEST` re-instantiates every provider on every request. That is expensive at scale and forces you to mark every provider up the entire dependency tree as request-scoped too. `AsyncLocalStorage` gives you per-request context without touching a single provider's scope.

## Step 2: The Tenant Interceptor

This interceptor runs on every incoming HTTP request. It reads the `companyId` from the authenticated user's JWT payload, or from a header for superadmins, and wraps the request execution inside the AsyncLocalStorage context so every downstream call can access the tenant ID.

```typescript
// tenant.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tenantStorage } from './tenant-context';

@Injectable()
export class TenantInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const companyId = this.resolveCompanyId(request);

    return new Observable((observer) => {
      tenantStorage.run({ tenantId: companyId }, () => {
        next.handle().subscribe({
          next: (val) => observer.next(val),
          error: (err) => observer.error(err),
          complete: () => observer.complete(),
        });
      });
    });
  }

  private resolveCompanyId(request: any): string {
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }

    if (user.isSuperAdmin) {
      const headerCompanyId = request.headers['x-company-id'];
      if (!headerCompanyId) {
        throw new UnauthorizedException(
          'Superadmin must select a company before making requests',
        );
      }
      return headerCompanyId;
    }

    if (!user.companyId) {
      throw new UnauthorizedException('User does not belong to any company');
    }

    return user.companyId;
  }
}
```

Register it globally in your `AppModule` so it applies to every route automatically:

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TenantInterceptor } from './tenant/tenant.interceptor';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TenantInterceptor,
    },
  ],
})
export class AppModule {}
```

One important note: if you have public routes that do not require authentication, like a health check or login endpoint, make sure your auth guard runs before the interceptor, or handle the case where `request.user` is undefined gracefully by returning early without throwing.

## Step 3: The Tenant Connection Service

This service maps a `companyId` to a Mongoose connection. Connections are cached in a Map so you do not open a new connection on every request. MongoDB has connection limits and opening a fresh connection per request would exhaust them quickly.

```typescript
// tenant-connection.service.ts
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, createConnection } from 'mongoose';
import { TenantContextService } from './tenant-context.service';

@Injectable()
export class TenantConnectionService implements OnModuleDestroy {
  private readonly connections = new Map<string, Connection>();

  constructor(
    @InjectConnection() private readonly masterConnection: Connection,
    private readonly tenantContextService: TenantContextService,
  ) {}

  async getTenantConnection(): Promise<Connection> {
    const tenantId = this.tenantContextService.getTenantId();

    if (this.connections.has(tenantId)) {
      return this.connections.get(tenantId);
    }

    // Confirm the tenant exists in the master DB before creating a connection
    const tenant = await this.masterConnection
      .collection('tenants')
      .findOne({ companyId: tenantId });

    if (!tenant) {
      throw new Error(`Tenant not found for companyId: ${tenantId}`);
    }

    const dbName = `tenant_${tenantId}`;
    // MONGO_BASE_URI should end with a slash, e.g. mongodb://localhost:27017/
    const baseUri = process.env.MONGO_BASE_URI;

    const connection = await createConnection(`${baseUri}${dbName}`, {
      maxPoolSize: 10,
    }).asPromise();

    this.connections.set(tenantId, connection);
    return connection;
  }

  async onModuleDestroy() {
    for (const connection of this.connections.values()) {
      await connection.close();
    }
  }
}
```

A few things worth calling out. First, `MONGO_BASE_URI` should be something like `mongodb://localhost:27017/` with a trailing slash so the database name appends cleanly. Second, implementing `OnModuleDestroy` is important so you do not leave hanging connections when the app restarts. Third, keep the pool size small per tenant connection. If you have many tenants, a large pool per connection will hit MongoDB's connection limits fast.

## Step 4: TenantMongooseModule

This is the piece that ties everything together. Instead of `MongooseModule.forFeature([...])` for tenant data, I created `TenantMongooseModule.forFeature([...])` which resolves the correct connection at request time using the tenant context.

```typescript
// tenant-mongoose.module.ts
import { DynamicModule, Module } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { ModelDefinition } from '@nestjs/mongoose';
import { TenantConnectionService } from './tenant-connection.service';

@Module({})
export class TenantMongooseModule {
  static forFeature(models: ModelDefinition[]): DynamicModule {
    const providers = models.map((model) => ({
      provide: getModelToken(model.name),
      useFactory: async (tenantConnectionService: TenantConnectionService) => {
        const connection = await tenantConnectionService.getTenantConnection();

        // If the model is already registered on this connection, return it
        // Without this check, Mongoose throws an error on concurrent requests
        if (connection.modelNames().includes(model.name)) {
          return connection.model(model.name);
        }

        return connection.model(model.name, model.schema);
      },
      inject: [TenantConnectionService],
    }));

    return {
      module: TenantMongooseModule,
      providers,
      exports: providers,
    };
  }
}
```

I am using `getModelToken(model.name)` from `@nestjs/mongoose` instead of manually constructing the token string. This matches how NestJS registers model tokens internally, so `@InjectModel(Document.name)` in your services continues to work without any changes.

The check for `connection.modelNames().includes(model.name)` before registering is also critical. Without it, Mongoose throws a "Cannot overwrite model once compiled" error when two requests hit the same tenant at the same time.

**Using it in a feature module:**

```typescript
// documents.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TenantMongooseModule } from '../tenant/tenant-mongoose.module';
import { Document, DocumentSchema } from './schemas/document.schema';
import { AgentConfig, AgentConfigSchema } from './schemas/agent-config.schema';
import { Tenant, TenantSchema } from '../tenant/schemas/tenant.schema';

@Module({
  imports: [
    // Tenant-isolated models use TenantMongooseModule
    TenantMongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
      { name: AgentConfig.name, schema: AgentConfigSchema },
    ]),

    // Master DB models (tenant registry, global config) use standard MongooseModule
    MongooseModule.forFeature([
      { name: Tenant.name, schema: TenantSchema },
    ]),
  ],
})
export class DocumentsModule {}
```

Your existing service does not change at all:

```typescript
// documents.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Document } from './schemas/document.schema';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel(Document.name) private readonly documentModel: Model<Document>,
  ) {}

  async findAll() {
    // This automatically queries the correct tenant DB
    return this.documentModel.find().exec();
  }
}
```

## Step 5: Superadmin Company Switching

Superadmins need to be able to operate as any tenant. I added a company selector dropdown in the React frontend. When the superadmin picks a company, the app stores it in state and an Axios interceptor appends it to every request header automatically.

```typescript
// frontend/src/api/axios.ts
import axios from 'axios';
import { getAuthUser, getSelectedCompany } from '../store/auth';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const user = getAuthUser();
  const selectedCompany = getSelectedCompany();

  if (user?.isSuperAdmin && selectedCompany?.id) {
    config.headers['x-company-id'] = selectedCompany.id;
  }

  return config;
});

export default axiosInstance;
```

On the backend, the tenant interceptor already handles this by checking `user.isSuperAdmin` and reading the header. No changes needed in any individual route or controller. One place to change, works everywhere.

## Step 6: Background Jobs and RabbitMQ

Background processes are the trickiest part because there is no HTTP request, so there is no interceptor running. I handled this by including the `tenantId` in every RabbitMQ message payload and manually seeding the AsyncLocalStorage context before processing.

```typescript
// document-events.consumer.ts
import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { tenantStorage } from '../tenant/tenant-context';
import { AgentService } from '../agents/agent.service';

@Injectable()
export class DocumentEventsConsumer {
  constructor(private readonly agentService: AgentService) {}

  @RabbitSubscribe({
    exchange: 'documents',
    routingKey: 'document.changed',
    queue: 'agent-processor',
  })
  async handleDocumentChanged(message: {
    tenantId: string;
    documentId: string;
  }) {
    await new Promise<void>((resolve, reject) => {
      tenantStorage.run({ tenantId: message.tenantId }, async () => {
        try {
          await this.agentService.processChange(message.documentId);
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    });
  }
}
```

When publishing a message, always include the tenant ID from the current context:

```typescript
// documents.service.ts (publisher side)
import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { TenantContextService } from '../tenant/tenant-context.service';

@Injectable()
export class DocumentsService {
  constructor(
    private readonly amqpConnection: AmqpConnection,
    private readonly tenantContextService: TenantContextService,
  ) {}

  async updateDocument(documentId: string, data: any) {
    // ... update logic ...

    await this.amqpConnection.publish('documents', 'document.changed', {
      tenantId: this.tenantContextService.getTenantId(),
      documentId,
    });
  }
}
```

For scheduled jobs that need to run across all tenants:

```typescript
// sync.service.ts
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { tenantStorage } from '../tenant/tenant-context';

@Injectable()
export class SyncService {
  constructor(
    @InjectConnection() private readonly masterConnection: Connection,
  ) {}

  @Cron('0 2 * * *')
  async runForAllTenants() {
    const tenants = await this.masterConnection
      .collection('tenants')
      .find({})
      .toArray();

    for (const tenant of tenants) {
      await new Promise<void>((resolve) => {
        tenantStorage.run({ tenantId: tenant.companyId }, async () => {
          try {
            await this.runDailySync();
          } catch (err) {
            console.error(`Sync failed for tenant ${tenant.companyId}:`, err);
          } finally {
            resolve();
          }
        });
      });
    }
  }

  private async runDailySync() {
    // Your sync logic here, it will automatically use the correct tenant DB
  }
}
```

## Step 7: Data Migration

This is the part most blog posts skip, but it is arguably the most critical step. You have existing data in your master database and you need to move it into per-tenant databases without losing anything, and ideally without downtime.

Here is the migration script I wrote. It reads all tenant records from the master DB, creates a connection to each tenant's database, and copies over all collections that belong to that tenant.

```typescript
// scripts/migrate-to-multitenant.ts
import mongoose, { Connection } from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const MASTER_URI = process.env.MONGO_MASTER_URI;
const BASE_URI = process.env.MONGO_BASE_URI; // e.g. mongodb://localhost:27017/

// Collections that belong to tenants (not the master DB)
// Update this list to match your actual collections
const TENANT_COLLECTIONS = [
  'documents',
  'agentconfigs',
  'users',
  'ragconfigs',
];

async function migrateTenant(
  masterConnection: Connection,
  companyId: string,
) {
  console.log(`\nStarting migration for tenant: ${companyId}`);

  const tenantDbName = `tenant_${companyId}`;
  const tenantConnection = await mongoose
    .createConnection(`${BASE_URI}${tenantDbName}`)
    .asPromise();

  try {
    for (const collectionName of TENANT_COLLECTIONS) {
      const masterCollection = masterConnection.collection(collectionName);

      const documents = await masterCollection
        .find({ companyId })
        .toArray();

      if (documents.length === 0) {
        console.log(`  ${collectionName}: no documents to migrate`);
        continue;
      }

      const tenantCollection = tenantConnection.collection(collectionName);

      // Make the script safe to re-run: skip if already migrated
      const existingCount = await tenantCollection.countDocuments();
      if (existingCount > 0) {
        console.log(
          `  ${collectionName}: already has ${existingCount} documents, skipping`,
        );
        continue;
      }

      // Insert in batches to avoid memory issues with large collections
      const batchSize = 500;
      let inserted = 0;

      for (let i = 0; i < documents.length; i += batchSize) {
        const batch = documents.slice(i, i + batchSize);
        await tenantCollection.insertMany(batch, { ordered: false });
        inserted += batch.length;
        console.log(
          `  ${collectionName}: inserted ${inserted}/${documents.length}`,
        );
      }

      // Verify the count matches before moving on
      const finalCount = await tenantCollection.countDocuments();
      if (finalCount !== documents.length) {
        throw new Error(
          `Count mismatch for ${collectionName} on tenant ${companyId}. ` +
          `Expected ${documents.length}, got ${finalCount}`,
        );
      }

      console.log(`  ${collectionName}: done (${finalCount} documents)`);
    }
  } finally {
    await tenantConnection.close();
  }

  console.log(`Completed migration for tenant: ${companyId}`);
}

async function runMigration() {
  console.log('Connecting to master database...');
  const masterConnection = await mongoose
    .createConnection(MASTER_URI)
    .asPromise();

  try {
    const tenants = await masterConnection
      .collection('tenants')
      .find({})
      .toArray();

    console.log(`Found ${tenants.length} tenants to migrate`);

    for (const tenant of tenants) {
      await migrateTenant(masterConnection, tenant.companyId);
    }

    console.log('\nAll tenants migrated successfully.');
    console.log(
      'You can now switch modules to TenantMongooseModule and deploy.',
    );
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  } finally {
    await masterConnection.close();
  }
}

runMigration();
```

Run it with:

```bash
ts-node scripts/migrate-to-multitenant.ts
```

**The rollout order I followed to avoid downtime:**

First, build and deploy the Tenant Module code but keep all feature modules still using the standard `MongooseModule.forFeature`. The new code is live but not yet active for any routes.

Second, run the migration script. Since it only reads from master and writes to new tenant databases, it does not affect live traffic at all.

Third, verify the migration by spot-checking document counts per tenant in both the master and tenant databases. A quick sanity check before you flip anything.

Fourth, switch feature modules one at a time from `MongooseModule.forFeature` to `TenantMongooseModule.forFeature`, deploy, and verify each one before moving to the next. Start with the least critical module.

Fifth, once all modules are switched, the old `companyId` filters in queries become redundant. Leave them for a while as a safety net, then clean them up in a separate commit once you are confident.

Sixth, after a few weeks of stable operation you can optionally drop the tenant-specific data from the master database to keep it clean.

## What I Did Not Have to Change

This is the part that made the whole effort worthwhile. Because tenant resolution happens entirely at the infrastructure level:

- All existing service methods stayed unchanged, no `companyId` parameter added anywhere
- All repository queries stayed unchanged, the correct connection is resolved automatically
- The RAG pipeline and OpenAI agent calls required zero changes
- All existing `companyId` filters in queries are now just an extra safety net rather than the only line of defense


The core idea is simple: isolate tenant resolution into infrastructure, not business logic. Your services should not know or care which database they are talking to. The interceptor and the module abstraction handle all of that, so a project that grew well beyond its original scope can evolve its data architecture without a full rewrite.

If you run into issues or have questions about any specific part of this, feel free to reach me out.

