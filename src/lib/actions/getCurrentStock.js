"use server";

import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export const getCurrentStock = async (ticketID) => {
  const available = await redis.get(`ticket:${ticketID}:available`);

  return !!available;
};
