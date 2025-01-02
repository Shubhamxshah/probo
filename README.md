
<a href="https://aimeos.org/">
    <img src="https://github.com/Shubhamxshah/probo/blob/main/frontend/public/probo.avif") alt="Aimeos logo" title="Aimeos" align="right" height="40" />
</a>

# Probo

[Probo](http://probo.shubhamxshah.xyz) is an opinion trading app allowing users to buy stocks of an event against or in the favor of it occurring in the near future.

![Probo-frontend](https://github.com/Shubhamxshah/probo/blob/main/frontend/public/probo-logo.png)

## Table of content. 

- [Architecture](#Architecture)
    - [Api server](#api-server)
    - [engine](#engine)
    - [Websocket server](#WebSocket-server)
    - [Devops pipeline](#DevOps-Pipleline)
- [DevOps Pipeline](#DevOps-Pipleline)
- [Installation](#installation)
- [Technologies](#Technologies)
- [Improvements](#Improvements)

## Architecture

Probo backend consists of an api-server, an engine, a websocket server and a database archiver. The requests are stored in a redis queue and picked up by them sequentially. The requests in engine are synchronous meaning the api server waits for a response from engine before stopping, whereas with archiver its asynchronous to save time. 

![probo-architecture](https://github.com/Shubhamxshah/probo/blob/main/frontend/public/probo-architecture.png)

### api-server 

The api server defines routes in the backend but does not process them to increase security so that anyone couldnt access the underlying logic and its not exposed directly to the users for the risk of attacks. Its essential to provide api routes publicly so that big traders could write their own programs on top of it and hit the server without interacting with the frontend to do so, saving crucial time.

### engine 

This is where the main logic lies. Engine is a singleton class and a single instance of it runs in the kubernetes. This is essential to make the trades secure and coherent. Engine also generates and stores objects in memory, to execute trades faster as latency is crucial to keep minimal in stock trading applications. Hence this is a stateful application. It asynchronously sends the changes in the redis queue for the database archiver to pick up and store in the database and moves on to process the next request. 

### WebSocket-server 

Websocket server sends updates of an event price based on live transactions to all the users connected in that event room. As soon as the user disconnects a particular room, it stops sending its updates. 

### Database-archiver 

Database archiver is a simple nodejs server with prisma initialised that picks up requests from the redis queue and processes them to store them in the database to keep the transactions secure. 

## DevOps-Pipeline

We're using github actions to make the ci/cd pipeline. Any changes to the codebase: 

-> triggers github workflow to build the apps,   
-> build their respective docker images,  
-> push the latest images to docker hub.  
-> We're tagging each latest image with a unique github-sha code that github attaches with each new pull requests.  
-> Then configuring github-bot to checkout [ops repository](https://github.com/Shubhamxshah/ops/) and update the  respective deployments and service files to update with the latest image tags pushed in dockerhub.  
-> The argocd detects that the desired state of the probo repository differs from the current state in cluster and hence updates the cluster to apply latest deployments in the nodes.  
-> For routing, we are using nginx-ingress controller to start a single load balancer and pass the requests to the particular services.  
-> This makes the development fast and simple for developers to quickly push newer changes. If the newer code breaks the production, argocd reverts back to the previous state and notifies the failed state in production. It does not break the app.   

## Installation 

run api, engine etc from respective folders not from src as nodemon will track file changes and restart  
start engine with WITH_SNAPSHOT=true nodemon src/index.ts --ignore 'trade/snapshot.json'  

## Technologies

- 🟢 Node.js  
- 💻 TypeScript  
- 🐳 Docker  
- 🌐 Kubernetes  
- ☁️  AWS  
- 🌊 DigitalOcean  
- 🚀 ArgoCD  
- ⚙️ GitHub Actions  
- 🛠️ Redis  
- ⚡ Next.js  
- 📡 WebSockets  
- 🐘 PostgreSQL  
- 🔧 NGINX  
- 🔒 SSL Certificates

## Improvements 

In order to optimise the app, follwing works are in the pipeline to make it more robust and scalable.   
   
-> Kafka instead of redis queue, as it enables us to store multiple requests and bulk update the database instead of hitting it on each new transaction.   
-> separate staging and production pipeline to test changes in development mode before merging it to the main app.  
-> frontend isnt complete.   
-> Scalable web-sockets. Currently it runs a single websocket server which can concurrently connect only ~10k users. A pub-sub architecture is needed to create a non-sticky scalable architecture. 
