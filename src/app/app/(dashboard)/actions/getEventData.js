"use server";

import { cache } from "react";

import { prisma } from "@/lib/database";

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

  const orderItemsCount = orders.reduce((acc, order) => {
    return acc + order._count.orderItems;
  }, 0);

  const orderCount = await prisma.order.count();
  const { _avg, _sum } = await prisma.order.aggregate({
    _avg: {
      total: true,
    },
    _sum: {
      total: true,
    },
  });

  const byWeekAndMonth = await prisma.order.aggregate({
    where: {
      date: {
        gte: moment(new Date()),
      },
    },
  });

  return {
    orderCount: orderCount,
    totalRevenue: _sum.total,
    averageRevenue: _avg.total,
    orderItemsCount,
    // userCount: userCount,
    // averageAge: averageAge.avg.age,
  };
};
