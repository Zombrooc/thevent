import { Client } from "@upstash/qstash";

const qstashClient = new Client({ token: process.env.QSTASH_TOKEN });

const createOrderQueue = qstashClient.queue({
  queueName: "createOrderQueue",
});

export { qstashClient, createOrderQueue };
