# Grafana and Prometheus Practice Application

<!--toc:start-->

- [Grafana and Prometheus Practice Application](#grafana-and-prometheus-practice-application)
  - [Overview](#overview)
  - [Running](#running)
  <!--toc:end-->

## Overview

This repository contains an application designed for practicing monitoring and visualization using Grafana and Prometheus. The application is a simple web server written in Node.js that uses Fastify that exposes a few endpoints for demonstration purposes. Prometheus is used to scrape metrics from the application, and Grafana is used to create dashboards to visualize these metrics.

Application repository link: [fastify-typescript-users](https://github.com/ginderick/fastify-typescript-users.git)

## Installation

1. Clone this repository to your local machine

```
https://github.com/ginderick/grafana-prometheus-example.git
```

2. Navigate to directory

```
cd grafana-prometheus-example
```

## Running

1. Start the application

```
docker compose up --build -d
```

### Accessing Prometheus

```
http://localhost:9090
```

### Accessing Grafana

```
http://localhost:3000
```

## License

This software is licensed under the [Apache 2 license](./LICENSE).
