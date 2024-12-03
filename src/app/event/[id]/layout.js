import Navbar from "@/components/Navbar";
import { constructMetadata } from "@/lib/constructMetadata";
import TicketProvider from "@/store/features/ticketCart/TicketProvider";

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

export async function generateMetadata(props) {
  const params = await props.params;
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
    }
  );

  return;
};
export default async function Layout(props) {
  const params = await props.params;

  const { children } = props;

  await incrementPageViews(params.id);
  // const { eventData } = await getEventData(params.id);

  return (
    <TicketProvider>
      <Navbar />
      {children}
    </TicketProvider>
  );
}
