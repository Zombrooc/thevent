import EventCardItem from "./EventCardItem";

const getEvents = async () => {
  const events = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/events`, {
    next: {
      revalidate: 3600,
    },
  });

  return await events.json();
};

export default async function EventCardList() {
  const { events } = await getEvents();

  return (
    <div className=" px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto max-w-5xl lg:px-8o">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {events.map((event) => (
          <EventCardItem key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
