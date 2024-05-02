"use server";

import { prisma } from "@/lib/database";
import { getAuth0UserDetails } from "@/lib/getAuth0UserDetails";

export const getOrdersByEvent = async (eventId) => {
  const orders = await prisma.order.findMany({
    where: {
      eventId: eventId,
    },
  });

  const updatedOrderWithUserDetails = await Promise.all(
    orders.map(async (order) => {
      const userDetails = await getAuth0UserDetails(order.userId);

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
