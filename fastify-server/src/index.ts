import Fastify from "fastify";
import client from "prom-client";

// Fastify and other web servers typically bind to the loopback IP address (127.0.0.1) on the host machine
// However docker container, this loopback IP address is inaccessible from the host machine or other network devices
const { ADDRESS = "localhost", PORT = "3000" } = process.env;

const register = new client.Registry();
register.setDefaultLabels({
  app: "fastify-server",
});
client.collectDefaultMetrics({ register });

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({
  labels: { NODE_APP_INSTANCE: process.env.NODE_APP_INSTANCE },
});

const requestsCounter = new client.Counter({
  name: "hello_world_total",
  help: "Hello World request.",
  registers: [register], // specify a non-default registry
});

const fastify = Fastify({
  logger: true,
});

fastify.get("/metrics", async (request, reply) => {
  reply.type(register.contentType).send(await register.metrics());
});

fastify.get("/", async (request, reply) => {
  requestsCounter.inc();
  reply.send({ hello: "world" });
});

fastify.listen(
  { host: ADDRESS, port: parseInt(PORT, 10) },
  function (err, address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  },
);
