import EventCardItem from "./EventCardItem";

const getEvents = async () => {
  let eventsRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/events`, {
    next: {
      revalidate: 3600,
    },
  });

  const { events } = await eventsRes.json();

  return events;
};

export default async function EventCardGridList() {
  const eventList = await getEvents();

  if (!eventList && eventList.length <= 0)
    "Nenhum evento para ser exibido no momento!";

  return (
    <div className="mt-6 grid gap-6 sm:grid-cols-3 lg:grid-cols-4">
      {eventList.map((eventDetails) => (
        <EventCardItem key={eventDetails.id} eventDetails={eventDetails} />
      ))}
    </div>
  );
}
