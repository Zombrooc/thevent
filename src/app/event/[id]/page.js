import { Badge } from "@/components/ui/badge";
import moment from "moment";
import Image from "next/image";

import TicketList from "./_components/TicketList";

import TicketProvider from "@/store/features/ticketCart/TicketProvider";
import { CalendarDaysIcon, MapPinnedIcon } from "lucide-react";

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

export default async function EventDetails({ params }) {
  const { eventData, error } = await getEventData(params.id);

  return (
    <>
      {eventData && (
        <>
          <div className="max-w-5xl rounded-xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 ">
            <Image
              alt="Map"
              className="w-full object-cover"
              height="337"
              src={eventData.bannerImage}
              width="600"
            />
          </div>
          <div className="max-w-5xl min-h-screen bg-muted/40 mx-auto px-4 sm:px-6 lg:px-8 pt-12 grid grid-cols-1 gap-x-5 gap-y-3 sm:grid-cols-6  ">
            <div className="col-span-4">
              <div className="w-full">
                <div className="space-y-2">
                  <div className="flex rounded-lg px-3 py-1 text-base ">
                    {eventData?.tags.map((tag, index) => (
                      <Badge key={index} className="mr-2">
                        {tag.tag}
                      </Badge>
                    ))}
                  </div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    {eventData.eventName}
                  </h1>
                  <div className="flex items-center gap-2 mt-4">
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarDaysIcon className="h-6 w-6" />
                      <time>
                        {moment(eventData.eventDataStart).format("DD/MM/YYYY")}
                      </time>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPinnedIcon className="h-6 w-6" />
                      <span>
                        {eventData.address.localName} | {eventData.address.city}
                        , {eventData.address.state}
                      </span>
                    </div>
                  </div>
                  {/* <div className="flex items-center gap-2 text-sm">
                <ClockIcon className="h-6 w-6" />
                <time>10:00 AM - 4:00 PM</time>
                  </div>*/}
                </div>
                <div>
                  <h2 className=" mt-10 text-3xl font-semibold leading-7 text-gray-900">
                    Descrição
                  </h2>
                  <div className="prose max-w-none mt-4">
                    <p>{eventData.eventDescription}</p>
                  </div>
                </div>
              </div>
            </div>
            <TicketProvider initialState={eventData.tickets}>
              <TicketList tickets={eventData.tickets} />
            </TicketProvider>
          </div>
        </>
      )}

      {error && <> Nenhum evento encontrado.</>}
    </>
  );
}
