"use server";

import { prisma } from "@/lib/database";
import { getUserDetails } from "@/lib/getUserDetails";
// import { getUserDetails } from "@/lib/getUserDetails";
import { clerkClient } from "@clerk/nextjs/server";

export const getEventData = async (id) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        event: { id: id },
      },
      orderBy: {
        createdAt: "desc",
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
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    const updatedOrderWithUserDetails = await Promise.all(
      firstFiveOrders.map(async (order) => {
        // const userDetails = await clerkClient.users.getUser(order?.userId);
        const userDetails = await getUserDetails(order?.userId);

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
      totalRevenue: _sum.total || 0,
      averageRevenue: _avg.total || 0,
      orderItemsCount,
      orders: updatedOrderWithUserDetails,
    };
  } catch (e) {
    throw new Error(e);
  }
};
