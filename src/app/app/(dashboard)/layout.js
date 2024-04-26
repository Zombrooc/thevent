import EventListProvider from "@/store/features/eventList/eventProvider";
import { getSession } from "@auth0/nextjs-auth0";

import { prisma } from "@/lib/database";

const EventList = async ({ sub }) => {
  const events = await prisma.Event.findMany({
    where: {
      organizer: sub,
    },
  });

  return events;
};
export default async function DashboardLayout({ children }) {
  const session = await getSession();

  const eventList = await EventList(session?.user);

  return (
    <EventListProvider initialState={eventList}>{children}</EventListProvider>
  );
}
