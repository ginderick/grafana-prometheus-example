import Fastify from "fastify";
import client from "prom-client";

const register = new client.Registry();
register.setDefaultLabels({
  app: "fastify-server",
});
client.collectDefaultMetrics({ register });
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

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
