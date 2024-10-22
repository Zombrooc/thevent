"use server";

import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export const getCurrentStock = async (ticketID) => {
  const pipeline = redis.pipeline();
  pipeline.get(`ticket:${ticketID}:available`);
  pipeline.keys(`reservation:${ticketID}:*`);

  const [available, reservation] = await pipeline.exec();

  if (reservation.length === 0) {
    return available;
  }

  const reservationValues = await redis.mGet(reservation);

  const reservedQuantity = reservationValues.reduce(
    (acc, val) => acc + parseInt(val, 10),
    0
  );
  return available - reservedQuantity;
};

export const hasStock = async (ticketID) => {
  const pipeline = redis.pipeline();
  pipeline.get(`ticket:${ticketID}:available`);
  pipeline.keys(`reservation:${ticketID}:*`);

  const [available, reservation] = await pipeline.exec();

  if (reservation.length === 0) {
    return available;
  }

  const reservationValues = await redis.mGet(reservation);

  const reservedQuantity = reservationValues.reduce(
    (acc, val) => acc + parseInt(val, 10),
    0
  );
  return available - reservedQuantity > 0 ? true : false;
};
