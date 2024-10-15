import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

const getTicketForms = async (ticketID) => {
  const forms = await redis.get(`ticket:${ticketID}:forms`);

  return forms;
};

export { getTicketForms };
