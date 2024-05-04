"use server";

import { prisma } from "@/lib/database";

export const getEventList = async ({ id }) => {
  const events = await prisma.Event.findMany({
    where: {
      organizer: id,
    },
  });

  return events;
};
