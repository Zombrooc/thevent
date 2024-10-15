"use server";

import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export const getCurrentStock = async (ticketID) => {
  const pipeline = redis.pipeline();
  pipeline.get(`ticket:${ticketID}:available`);
  pipeline.get(`ticket:${ticketID}:reserved`);

  const [available, reserved] = await pipeline.exec();

  return available - (reserved || 0) > 0 ? true : false;
};
