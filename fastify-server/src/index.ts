import Fastify from "fastify";
import metricsPlugin from "fastify-metrics";

// Fastify and other web servers typically bind to the loopback IP address (127.0.0.1) on the host machine
// However docker container, this loopback IP address is inaccessible from the host machine or other network devices
async function main() {
  const { ADDRESS = "localhost", PORT = "3000" } = process.env;

  const fastify = Fastify({
    logger: true,
  });
  await fastify.register(metricsPlugin, { endpoint: "/metrics" });

  fastify.get("/", async (request, reply) => {
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
}

main();
