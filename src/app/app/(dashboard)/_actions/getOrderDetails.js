"use server";

import { prisma } from "@/lib/database";
import { getUserDetails } from "@/lib/getUserDetails";

export async function getOrderDetails(orderId) {
  const orderDetails = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      orderItems: true,
      event: true,
    },
  });

  const userDetails = await getUserDetails(orderDetails.userId);
  const updatedOrderDetails = {
    ...orderDetails,
    user: {
      ...userDetails,
    },
  };

  return updatedOrderDetails;
}
