"use server";

import { prisma } from "@/lib/database";

export const getUserEvents = async (user) => {
  const events = await prisma.event.findMany({
    where: {
      organizer: user?.sub,
    },
  });

  console.log(events);

  return events;
};
