"use server";

import { prisma } from "@/lib/database";

export const getEventList = async ({ sub }) => {
  const events = await prisma.Event.findMany({
    where: {
      organizer: sub,
    },
  });

  return events;
};
