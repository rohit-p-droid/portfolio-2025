# Docker Part 2: Dockerizing a Simple Node.js App

In Part 1, we learned what Docker is and ran our first container. Now it’s time to Dockerize a real application — a simple Node.js app! 🔥

[Read Part 1: Introduction to Docker and Running Your First Container](./introduction-to-docker-a-beginner-friendly-guide-1.md)

---

## Agenda
- Create a basic Node.js app
- Write a Dockerfile
- Build a Docker image
- Run the app inside a Docker container

---

## Step 1: Set Up the Project

Create a folder:

```sh
mkdir docker-node-app && cd docker-node-app
```

Now create a simple Node.js app:

**index.js**
```js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('🚀 Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

**package.json**
```json
{
  "name": "docker-node-app",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

Install dependencies:

```sh
npm install
```

---

## Step 2: Create the Dockerfile

A Dockerfile is a text file that contains instructions for building a Docker image. By defining how your application and its dependencies are packaged, the Dockerfile ensures your app can run consistently across different environments.

Create a file named `Dockerfile` (no extension):

**Dockerfile**
```dockerfile
# Use an official Node.js image as base
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source code
COPY . .

# Expose port 3000 to the outside world
EXPOSE 3000

# Define the command to start the application
CMD ["npm", "start"]
```

---

## Step 3: Build the Docker Image

From the project directory, run:

```sh
docker build -t docker-node-app .
```

You’ll see output as Docker reads the Dockerfile, installs dependencies, and builds the image.

---

## Step 4: Run the Container

```sh
docker run -p 3000:3000 docker-node-app
```

**What's happening here?**
- `-p 3000:3000` maps port 3000 on your computer to port 3000 inside the container
- The app is now running in complete isolation from your local environment

Visit [http://localhost:3000](http://localhost:3000) and you should see "🚀 Hello World!" displayed.

---

## Sample Project on GitHub
You can find the complete sample project here:
[https://github.com/rohit-p-droid/docker-node-app](https://github.com/rohit-p-droid/docker-node-app)

---

## Docker Commands Recap

| Command | Description |
|---------|-------------|
| `docker build -t name .` | Builds image from Dockerfile |
| `docker run -p 3000:3000 name` | Runs container with port mapping |
| `docker ps` | Lists running containers |
| `docker stop <id>` | Stops a container |

---

## Bonus: .dockerignore File

Create a `.dockerignore` to keep the image clean:

**.dockerignore**
```
node_modules
npm-debug.log
```

---

## Conclusion
- Dockerized a Node.js app
- Learned how Dockerfile works
- Ran your app in a container

---

## Up Next
**Part 3:** Docker Compose – Build a Full-Stack App with Frontend, Backend, and Database

Coming soon! 🔧