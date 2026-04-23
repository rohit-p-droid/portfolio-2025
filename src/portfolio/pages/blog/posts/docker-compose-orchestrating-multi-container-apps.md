# Docker Compose: Orchestrating Multi-Container Apps

Docker Compose is a tool that allows you to define and manage multiple containers as a single application.

Instead of running each container manually with `docker run`, you define all services in a single YAML file (`docker-compose.yml`) and manage them together.

---

## Why Use Docker Compose?
- Simplifies running multi-container apps (frontend + backend + DB)
- Makes configuration reproducible across machines
- Handles networking between containers automatically
- Can scale services with a single command (`docker compose up --scale backend=3`)

---

## Example: Production-Ready Docker Compose Setup for Next.js + Node.js Backend

### Directory Structure
```
project-root/
├─ backend/
│  ├─ src/
│  ├─ package.json
│  ├─ package-lock.json
│  └─ .env
├─ frontend/
│  ├─ pages/
│  ├─ public/
│  ├─ package.json
│  ├─ package-lock.json
│  └─ .env.production
├─ docker-compose.yml
├─ .env       # optional root-level env for Compose
```

---

### Backend Dockerfile (`backend/Dockerfile`)
```dockerfile
# Stage 1: Build
FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 5000

CMD ["node", "src/index.js"]
```

### Frontend Dockerfile (`frontend/Dockerfile`)
```dockerfile
# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Production image
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]
```

---

### Docker Compose File (`docker-compose.yml`)
```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./backend
    env_file:
      - ./backend/.env
    environment:
      - NODE_ENV=production
      - DATABASE_URL=mongodb://mongodb:27017/myapp
    ports:
      - "5000:5000"
    restart: unless-stopped
    networks:
      - app-network
    depends_on:
      - mongodb
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '0.5'
    security_opt:
      - no-new-privileges:true
    volumes:
      - app-logs:/app/logs

  frontend:
    build:
      context: ./frontend
    env_file:
      - ./frontend/.env.production
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=http://backend:5000
    ports:
      - "3000:3000"
    restart: unless-stopped
    networks:
      - app-network
    depends_on:
      backend:
        condition: service_healthy
    deploy:
      resources:
        limits:
          memory: 256M
          cpus: '0.3'
    security_opt:
      - no-new-privileges:true

  mongodb:
    image: mongo:6
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=password123
      - MONGO_INITDB_DATABASE=myapp
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
      - ./mongo-init:/docker-entrypoint-initdb.d
    networks:
      - app-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "mongosh", "--eval", "db.adminCommand('ping')"]
      interval: 30s
      timeout: 10s
      retries: 3

networks:
  app-network:
    driver: bridge

volumes:
  mongo-data:
    driver: local
  app-logs:
    driver: local
```

---

This is the docker compose file which will integrate the frontend and backend docker. Both use the same network so they can communicate. The database is also configured as a service with a volume so your data isn't lost.

---

## Key Features Explained

### 1. Health Checks
Health checks ensure services are running properly before dependent services start:
```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:5000/health"]
  interval: 30s
  timeout: 10s
  retries: 3
```

### 2. Resource Limits
Prevent services from consuming too much system resources:
```yaml
deploy:
  resources:
    limits:
      memory: 512M
      cpus: '0.5'
```

### 3. Security Context
Add security restrictions to containers:
```yaml
security_opt:
  - no-new-privileges:true
```

### 4. Environment Variables
Pass configuration to containers:
```yaml
environment:
  - NODE_ENV=production
  - API_URL=http://backend:5000
```

---

## Development vs Production Configurations

### Development Setup (`docker-compose.dev.yml`)
```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./backend
      target: development
    volumes:
      - ./backend:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    command: npm run dev

  frontend:
    build:
      context: ./frontend
      target: development
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    command: npm run dev
```

---

### Running Different Configurations
```sh
# Development
docker compose -f docker-compose.yml -f docker-compose.dev.yml up

# Production  
docker compose -f docker-compose.yml -f docker-compose.prod.yml up
```

---

## Essential Commands
```sh
# Build and start all services
docker compose up --build

# Run in background
docker compose up -d --build

# Scale specific services
docker compose up --scale backend=3

# View logs
docker compose logs -f backend

# Execute commands in running container
docker compose exec backend bash

# Stop all services
docker compose stop

# Stop specific service
docker compose stop backend

# Remove containers (keeps images and volumes)
docker compose down

# Remove containers and images
docker compose down --rmi all

# Remove containers, images, and volumes
docker compose down --rmi all --volumes
```
> **Note:** `docker compose down` stops and removes containers, but keeps images and volumes by default.

---

## Troubleshooting Common Issues

### 1. Port Conflicts
```sh
# Check what's using the port
netstat -tulpn | grep :3000

# Change port mapping in docker-compose.yml
ports:
  - "3001:3000"  # Use different host port
```

### 2. Network Connectivity Issues
```sh
docker compose exec frontend ping backend
docker compose exec backend ping mongodb
```

### 3. Build Cache Issues
```sh
# Force rebuild without cache
docker compose build --no-cache

# Remove all unused images and build fresh
docker system prune -a
```

### 4. Volume Permission Problems
```sh
# Fix volume permissions
docker compose exec backend chown -R node:node /app/logs
```

### 5. Service Won't Start
```sh
# Check service logs
docker compose logs backend

# Check service status
docker compose ps
```

---

## Monitoring and Observability

### Adding Monitoring Stack
Add to `services` in your `docker-compose.yml`:
```yaml
prometheus:
  image: prom/prometheus
  ports:
    - "9090:9090"
  volumes:
    - ./prometheus.yml:/etc/prometheus/prometheus.yml
  networks:
    - app-network

grafana:
  image: grafana/grafana
  ports:
    - "3001:3000"
  environment:
    - GF_SECURITY_ADMIN_PASSWORD=admin
  networks:
    - app-network
```

---

## Best Practices
- Use specific image tags instead of `latest`
- Set resource limits to prevent resource exhaustion
- Use health checks for critical services
- Implement proper logging with log rotation
- Use secrets management for sensitive data
- Regular cleanup of unused images and volumes
- Use multi-stage builds for smaller production images

---

## Example Project
You can find a complete working example of this Docker Compose setup in the following repository:

🔗 [GitHub Repository](https://github.com/rohit-p-droid/docker-compose-sample)

This repository includes:

- ✅ Complete Next.js frontend with TypeScript
- ✅ Express.js backend API with CORS configuration
- ✅ Docker Compose setup for multi-container orchestration
- ✅ Environment variable configuration
- ✅ Production-ready Dockerfiles
- ✅ API integration between frontend and backend

Feel free to explore the code, modify it, and use it as a starting point for your own projects!