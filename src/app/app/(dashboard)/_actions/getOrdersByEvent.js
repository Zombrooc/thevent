"use server";

import { prisma } from "@/lib/database";
import { getUserDetails } from "@/lib/getUserDetails";

export const getOrdersByEvent = async (eventId) => {
  const orders = await prisma.order.findMany({
    where: {
      eventId: eventId,
    },
  });

  const updatedOrderWithUserDetails = await Promise.all(
    orders.map(async (order) => {
      const userDetails = await getUserDetails(order?.userId);

      // const user = {
      //   id: userDetails.id,
      //   name: `${userDetails.firstName} ${userDetails.lastName}`,
      //   email: userDetails.emailAddresses[0].emailAddress,
      //   imageUrl: userDetails.imageUrl,
      // };

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
