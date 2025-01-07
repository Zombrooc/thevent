"use server";

import { prisma } from "@/lib/prisma";
import { getUserDetails } from "@/lib/getUserDetails";

export const getOrdersByEvent = async (eventId) => {
  const orders = await prisma.order.findMany({
    where: {
      eventId: eventId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const updatedOrderWithUserDetails = await Promise.all(
    orders.map(async (order) => {
      const userDetails = await getUserDetails(order?.userId);

      return {
        ...order,
        user: {
          ...userDetails,
        },
      };
    })
  );

  return updatedOrderWithUserDetails;
};
