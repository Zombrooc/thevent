"use server";
import { prisma } from "@/lib/database";
import { getAuth0UserDetails } from "@/lib/getAuth0UserDetails";

export const getEventData = async (id) => {
  const orders = await prisma.order.findMany({
    where: {
      event: { id: id },
    },
    include: {
      _count: {
        select: { orderItems: true },
      },
    },
  });

  const firstFiveOrders = await prisma.order.findMany({
    where: {
      event: { id: id },
    },
    take: 5,
  });

  const updatedOrderWithUserDetails = await Promise.all(
    firstFiveOrders.map(async (order) => {
      const userDetails = await getAuth0UserDetails(order.userId);

      return {
        ...order,
        user: {
          ...userDetails,
        },
      };
    })
  );

  const orderItemsCount = orders.reduce((acc, order) => {
    return acc + order._count.orderItems;
  }, 0);

  const orderCount = await prisma.order.count();
  const { _avg, _sum } = await prisma.order.aggregate({
    where: {
      paymentStatus: "paid",
    },
    _avg: {
      total: true,
    },
    _sum: {
      total: true,
    },
  });

  return {
    orderCount: orderCount,
    totalRevenue: _sum.total,
    averageRevenue: _avg.total,
    orderItemsCount,
    orders: updatedOrderWithUserDetails,
  };
};
