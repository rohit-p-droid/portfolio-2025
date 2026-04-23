# Introduction to Docker: A Beginner-Friendly Guide

> _"It worked on my machine..." — every developer ever._  
> Docker helps fix that. 😅

Many developers and testers face the classic "works on my machine" problem. Docker is here to solve it.

---

## What is Docker?

Docker is a platform that allows developers to package applications and their dependencies into **containers**. These containers can run anywhere—your laptop, a server, or the cloud—without compatibility issues.

Think of Docker as a lightweight virtual machine. But instead of running a whole OS, it shares the host system’s kernel, making it faster and more efficient.

---

## What Are Containers?

Imagine you're shipping goods. You pack them neatly in containers, and they can travel via ship, train, or truck—without repacking.

- A container holds your app, dependencies, environment variables, and system tools.
- It can run anywhere without “but it works on my machine” issues.

## Docker Containers
![Docker Containers](/assets/blogs/docker-containers.png)

## Docker Images
![Docker Images](/assets/blogs/docker-images.png)
---

## Key Docker Concepts

- **Image:** A read-only template used to create containers (e.g., a Node.js image).
- **Container:** A running instance of an image. Think of it as a lightweight, standalone app.
- **Dockerfile:** A script of instructions on how to build a Docker image.
- **Docker Hub:** A cloud-based registry where you can find pre-built images.
- **Volumes:** Used to persist data even when the container stops.

---

## Installing Docker

1. Download Docker Desktop for your OS (Linux, Windows, Mac).
2. It works best on Linux, but you can use it on any OS.
3. After installing, check the version:
   ```sh
   docker --version
   ```
4. Run the Hello World container:
   ```sh
   docker run hello-world
   ```
   If you see a message saying _"Hello from Docker!"_, you're ready to go!

---

## Docker in Action: Nginx Example

Let’s run an actual web server (nginx):

```sh
docker run -d -p 8080:80 nginx
```

- `-d`: Run in detached mode (in the background)
- `-p 8080:80`: Map local port 8080 to container's port 80

Visit [http://localhost:8080](http://localhost:8080) in your browser. You'll see the nginx welcome page served from inside a container!

---

## Useful Docker Commands

- **List all running containers:**
  ```sh
  docker ps
  ```
- **Stop a running container:**
  ```sh
  docker stop <container_id>
  ```
- **Remove a stopped container:**
  ```sh
  docker rm <container_id>
  ```
- **List all Docker images:**
  ```sh
  docker images
  ```
- **Remove a Docker image:**
  ```sh
  docker rmi <image_id>
  ```

---

## Conclusion

You’ve just learned:

- What Docker is and why it’s useful
- The difference between images and containers
- How to run your first container

---

## Stay Tuned

**Part 2:** _Dockerizing a Simple App – Step-by-Step Tutorial_  
Coming Soon 🚀