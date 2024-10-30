import EventCardItem from "./EventCardItem";

const getEvents = async () => {
  let eventsRes = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/events`, {
    next: {
      revalidate: 0,
    },
  });

  const { events } = await eventsRes.json();

  return events;
};

export default async function EventCardGridList() {
  const eventList = await getEvents();

  return (
    <>
      {/* <div className=" px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto max-w-5xl lg:px-8o">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {events &&
          events.map((event) => <EventCardItem key={event.id} event={event} />)}
      </div>
    </div> */}

      <div className="mt-6 grid gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {eventList &&
          eventList.map((eventDetails) => (
            <EventCardItem key={eventDetails.id} eventDetails={eventDetails} />
          ))}
      </div>
    </>
  );
}
