# Scaling in System Design: Vertical vs Horizontal & Load Balancing

Building a scalable system means preparing your application to handle growth—more users, more data, and more traffic—without crashing or slowing down.

Scaling isn’t just about “adding more servers”; it’s about doing it intelligently.

---

## What is Scaling?
Scaling means increasing your system’s capacity to handle more load (more requests, users, or data) while maintaining performance.

| Type                | How it works                                      | Pros                                 | Cons                                 |
|---------------------|---------------------------------------------------|--------------------------------------|--------------------------------------|
| Vertical Scaling    | Add more power (CPU, RAM, SSD) to the existing machine | Easy to implement, no code change    | Hardware limits, costly, downtime    |
| Horizontal Scaling  | Add more machines/servers and distribute the load | Infinite scalability, fault tolerance| Complex setup, requires load balancing|

---

### Vertical Scaling (Scaling Up)
Vertical scaling means improving your existing machine.

**Example:** Upgrading from 4 cores → 16 cores, or 16 GB RAM → 64 GB RAM.

**Pros:**
- Simple: no change in code or architecture.
- Works well for small systems or monoliths.
- Consistent performance (single-node).

**Cons:**
- Single Point of Failure: if the server goes down, the whole system fails.
- Hardware limit: you can’t scale beyond what a single machine can handle.
- Downtime during upgrade.

**Example:**
Imagine you’re hosting your web app on one powerful AWS EC2 instance. You start with t2.medium, then upgrade to m5.4xlarge for more users—that’s vertical scaling.

---

### Horizontal Scaling (Scaling Out)
Horizontal scaling means adding more servers and distributing traffic among them.

**Pros:**
- High availability: even if one server fails, others keep the system alive.
- Infinite scalability: just add more nodes as traffic grows.
- Cost-effective: use many smaller servers instead of one huge machine.

**Cons:**
- More complex architecture (load balancer, distributed cache, DB replication).
- Must handle state management (sessions, consistency).
- Network overhead increases with many nodes.

**Example:**
If your web app runs on 3 EC2 instances behind a load balancer, that’s horizontal scaling. Traffic is split between servers, improving performance and reliability.

---

## Vertical vs Horizontal Scaling: Quick Comparison
| Feature           | Vertical Scaling      | Horizontal Scaling         |
|-------------------|----------------------|---------------------------|
| How it works      | Upgrade single server| Add more servers          |
| Cost              | Expensive (bigger machines) | Scalable (add cheap servers) |
| Complexity        | Simple               | Complex                   |
| Downtime          | Yes (during upgrade) | No (can scale dynamically) |
| Failure Tolerance | Low (one server fails → system down) | High (redundancy) |
| Example           | Add more RAM to database | Add more DB replicas     |

---

## Load Balancers: The Heart of Horizontal Scaling
When you have multiple servers, you need something to distribute incoming traffic—that’s where a load balancer comes in.

A load balancer (LB) sits between users and your backend servers. It evenly distributes incoming requests to prevent any single server from being overloaded.

![Load Balancers](/assets/blogs/load-balancers.png)

**Load Balancer Responsibilities:**
- Distribute traffic evenly.
- Detect unhealthy servers and reroute traffic.
- Provide a single entry point (IP/DNS) for all clients.
- Improve availability and scalability.

---

## Load Balancing Algorithms
Load balancers use different strategies to route traffic:

| Algorithm            | Description                                         | Use Case           |
|----------------------|-----------------------------------------------------|--------------------|
| Round Robin          | Sends requests to servers one by one in a loop      | Balanced traffic   |
| Least Connections    | Sends request to the server with the fewest active connections | Uneven loads      |
| IP Hash              | Routes users based on their IP (sticky sessions)    | Consistent sessions|
| Weighted Round Robin | Servers get requests based on their capacity        | Heterogeneous servers|
| Random / Hash-based  | Distributes randomly or by custom hash              | Special routing rules|

---

## SPOF: Single Point of Failure
Even load balancers can fail! 😨 If your load balancer goes down, the entire system becomes unreachable.

This is called a **Single Point of Failure (SPOF)**, a single component whose failure brings down the whole system.

### How to Eliminate SPOF
- Use redundant load balancers (primary + secondary).
- Use DNS-level load balancing (like AWS Route53 or Cloudflare).
- Use health checks to automatically switch to backups.

**Example:**
2 load balancers (active + standby) managed by Keepalived / HAProxy or AWS Elastic Load Balancer (ELB) handle failover automatically.

---

## Software vs Hardware Load Balancers
| Type                  | Examples                  | Description                    | Pros                        | Cons                        |
|-----------------------|--------------------------|--------------------------------|-----------------------------|-----------------------------|
| Software Load Balancer| Nginx, HAProxy, Envoy, Traefik | Installed on commodity servers | Flexible, cheap, customizable| Slightly slower under high load|
| Hardware Load Balancer| F5 Big-IP, Citrix ADC    | Dedicated network appliances   | Ultra-fast, reliable, enterprise-grade | Expensive, hard to scale   |

Most modern cloud architectures rely on software or managed load balancers (AWS ELB, GCP Load Balancer, Azure Front Door).

---

## Load Balancing in Cloud Environments
If you’re using a cloud platform, you usually get managed load balancers out of the box:

| Cloud     | Service                        | Description                    |
|-----------|-------------------------------|--------------------------------|
| AWS       | Elastic Load Balancer (ALB/NLB)| Auto-scaling, health checks    |
| GCP       | Cloud Load Balancing           | Global, L7 load balancing      |
| Azure     | Azure Load Balancer / Front Door| Regional + global routing      |
| Cloudflare| Load Balancer + DNS            | Global CDN + failover          |

These eliminate SPOF automatically and are highly fault-tolerant.

---

> **Scaling isn’t about adding power, it’s about building resilient systems that stay fast and available as you grow.**
>
> Start with vertical scaling (simple) while your system is small. Once traffic grows, move to horizontal scaling with load balancing and redundancy. And always, design to avoid SPOFs.