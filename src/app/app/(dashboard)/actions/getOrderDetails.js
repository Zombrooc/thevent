"use server";

import { prisma } from "@/lib/database";
import { getAuth0UserDetails } from "@/lib/getAuth0UserDetails";

export async function getOrderDetails(orderId) {
  const orderDetails = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      orderItems: true,
      event: true,
    },
  });

  const userDetails = await getAuth0UserDetails(orderDetails.userId);
  const updatedOrderDetails = {
    ...orderDetails,
    user: {
      ...userDetails,
    },
  };

  return updatedOrderDetails;
}
