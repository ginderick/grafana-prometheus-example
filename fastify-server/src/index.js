"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const prom_client_1 = __importDefault(require("prom-client"));
const register = new prom_client_1.default.Registry();
register.setDefaultLabels({
    app: "fastify-server",
});
prom_client_1.default.collectDefaultMetrics({ register });
const requestsCounter = new prom_client_1.default.Counter({
    name: "hello_world_total",
    help: "Hello World request.",
    registers: [register], // specify a non-default registry
});
const fastify = (0, fastify_1.default)({
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
