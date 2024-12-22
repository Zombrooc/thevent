"use server";

import { Redis } from "@upstash/redis";
import { RESERVATION_STATUS } from "@prisma/client";
import { prisma } from "../prisma";

const redis = Redis.fromEnv();

export const getCurrentStock = async (ticketID) => {
  const currentStock = await redis.get(`ticket:${ticketID}:available`);

  return !!currentStock;
};

export const getCurrentStockFromDB = async (ticketID) => {
  const { _count, ticketDefaultAvailableStock } =
    await prisma.ticket.findUnique({
      where: {
        id: ticketID,
      },
      select: {
        _count: {
          select: {
            reservedTickets: {
              where: {
                AND: [
                  { ticketId: ticketID },
                  { version: 0 },
                  {
                    status: {
                      in: [
                        RESERVATION_STATUS.RESERVED,
                        RESERVATION_STATUS.SUCCESSFUL,
                      ],
                    },
                  },
                ],
              },
            },
          },
        },
        ticketDefaultAvailableStock: true,
      },
    });

  const currentStock = ticketDefaultAvailableStock - _count.reservedTickets;

  return {
    reserved: _count.reservedTickets,
    ticketDefaultAvailableStock,
    currentStock,
    hasStock: currentStock > 0 ? true : false,
  };
};
