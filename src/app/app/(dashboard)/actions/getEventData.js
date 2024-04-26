"use server";

import { prisma } from "@/lib/database";

export const getEventData = async (id) => {
  const data = await prisma.order.findMany({
    where: {
      event: { id: id },
    },
  });

  const orderCount = await prisma.order.count();
  const { _avg, _sum } = await prisma.order.aggregate({
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
    // userCount: userCount,
    // averageAge: averageAge.avg.age,
  };
};
