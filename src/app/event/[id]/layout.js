import Navbar from "@/components/Navbar";
import { constructMetadata } from "@/lib/constructMetadata";
import TicketProvider from "@/store/features/ticketCart/TicketProvider";

// export async function generateStaticParams() {
//   const eventRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/events`);

//   const { events } = await eventRes.json();

//   return events.map((event) => ({
//     id: event.id,
//   }));
// }

const getEventData = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/events/${id}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  if (res.status === 200) {
    return await res.json();
  } else {
    return { error: 404 };
  }
};

export async function generateMetadata({ params }) {
  const { eventData: event, error } = await getEventData(params.id);

  if (error === 404) {
    return constructMetadata();
  } else {
    const title = `${event.eventName} - ${process.env.NEXT_PUBLIC_APP_NAME}`;
    const description = event.eventDescription;

    return constructMetadata(title, description);
  }
}

const incrementPageViews = async (eventId) => {
  await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/analytics/${eventId}/increment-views`,
    {
      method: "POST",
      cache: "no-cache",
    }
  );

  return;
};
export default async function Layout({ children, params }) {
  await incrementPageViews(params.id);
  const { eventData } = await getEventData(params.id);

  return (
    <TicketProvider initialState={eventData.tickets}>
      <Navbar />
      {children}
    </TicketProvider>
  );
}
