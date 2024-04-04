import { prisma } from "@/lib/database";

import EventCardItem from "./EventCardItem";

export default async function EventCardList() {
  const events = await prisma.event.findMany({
    take: 6,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      addresses: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  return (
    <div className=" px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto max-w-7xl lg:px-8o">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {events.map((event) => (
          <EventCardItem key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
