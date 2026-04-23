# Introduction: The Need for Kubernetes

In the age of microservices, managing containers at scale is a challenge. Kubernetes solves this problem.

---

## What is Kubernetes?
Kubernetes (often written as K8s) is an open-source container orchestration platform. In simple terms:

- You have containers (like Docker containers) that run your applications.
- Kubernetes helps you manage, scale, deploy, and keep them running reliably — across one or many machines (servers).
- 👉 Think of it as the “operating system for your containers”.

---

## What does it do?
- Automatically restarts failed containers.
- Scales up/down your app when traffic changes.
- Distributes load via load balancing.
- Helps in rolling updates (deploy new versions with zero downtime).
- Runs on many platforms (on-premises, cloud, hybrid).

---

## Core Concepts
- **Cluster:** A set of machines (nodes) managed by Kubernetes.
- **Node:** A machine (physical/virtual) that runs your containers.
- **Pod:** The smallest unit in Kubernetes. A pod usually wraps one container, but can have multiple containers that work together.
- **Deployment:** Defines how many replicas of your application (pods) you want and handles updates.
- **Service:** Provides a stable network endpoint (IP/URL) to access your pods, even if pods keep changing.
- **ConfigMap & Secret:** Store configuration and sensitive info (like DB passwords).
- **Ingress:** Controls external access (like exposing your app via domain name with routing).

---

## How does Kubernetes work?
You define your desired state in a YAML manifest (e.g., “I want 3 replicas of my app running”).
Kubernetes’ control plane (master) ensures reality matches your desired state:
- If a pod crashes, it creates a new one.
- If traffic increases, it scales more pods.
- If you update your app version, it rolls out gradually.

It’s a self-healing, auto-scaling, declarative system.

---

## Cluster Architecture

![Kubernetes Cluster Architecture](/assets/blogs/kubernetes-cluster-architecture.png)

### Kubernetes cluster components

#### Control Plane Components
- **etcd 🗄️**
  - A distributed key-value store.
  - Stores the state of the cluster (e.g., how many pods should exist, current nodes, configs).
  - Acts like Kubernetes’ database.
- **kube-apiserver 🌐**
  - The front door to the cluster.
  - All communication (kubectl, dashboard, controllers, etc.) goes through the API server.
  - Validates and processes requests, then updates etcd.
- **scheduler (kube-scheduler) 📅**
  - Decides where to run pods.
  - Looks at requirements (CPU, memory, affinity rules) and picks a node.
  - Example: “Pod X should run on Node 1 because Node 2 has no space.”
- **controller manager (kube-controller-manager) ⚙️**
  - Runs controllers that watch cluster state and make changes.
  - Example: ReplicaSet controller checks if 3 replicas are running — if not, it creates/deletes pods.
  - Includes node controller, job controller, etc.
- **cloud-controller-manager ☁️**
  - Manages cloud-specific integrations (AWS, GCP, Azure).
  - Talks to the cloud provider API for tasks like provisioning load balancers, managing storage volumes, or handling nodes.

#### Worker Nodes
Each node is a machine (VM or physical) and contains:

- **kubelet 🧑‍🏭**
  - Agent running on each node.
  - Talks to the API server.
  - Ensures the containers in pods are running (using the container runtime like Docker or containerd).
  - If a pod dies, kubelet restarts it.
- **kube-proxy 🔀**
  - Handles networking for pods.
  - Maintains network rules to allow communication between pods and services.
  - Does load balancing inside the cluster.
- **Pods 📦**
  - The smallest unit in Kubernetes.
  - Each pod contains one or more containers that share networking/storage.
  - Managed by kubelet.
- **CRI (Container Runtime Interface) 🐳**
  - The actual runtime that runs containers (Docker, containerd, CRI-O).
  - Kubelet talks to CRI to start/stop containers.
- **Cloud Provider API**
  - If you run Kubernetes on a cloud (AWS/GCP/Azure), the cloud-controller-manager interacts with the provider.
  - Example: If you create a Service of type LoadBalancer, it will ask the cloud API to create a cloud load balancer.

---

## How it all works (Flow)
1. You tell Kubernetes (via kubectl → API Server): “Run 3 pods of my app.”
2. API server saves desired state in etcd.
3. Scheduler decides which node will run each pod.
4. Kubelet on that node tells the container runtime to start containers inside pods.
5. Kube-proxy ensures networking so services can reach pods.
6. Controllers keep watching — if a pod crashes, a new one is created automatically.

> **In short:** Kubernetes is like a manager for your containers, making sure apps run smoothly, scale properly, and recover automatically.