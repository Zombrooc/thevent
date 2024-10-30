import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card } from "../ui/card";

export default async function EventCardItem({ eventDetails }) {
  const {
    id: eventID,
    bannerImage,
    eventName,
    eventDateStart,
    eventDateEnd,
    address,
    tags,
  } = eventDetails;

  return (
    <>
      {/*     
    <Link href={`/event/${event.id}`}>
      <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
        <div className="max-h-72 aspect-w-12 aspect-h-7 sm:aspect-none rounded-xl overflow-hidden">
          <Image
            className="rounded-t-xl w-full object-cover h-40"
            height="500"
            width="500"
            
            src={event.bannerImage}
            alt="Image Description"
          />
        </div>

        <div className="p-4 md:p-6">
          <h3 className="text-lg font-semibold text-primary">
            {event.eventName}
          </h3>
          <span className="block mb-1 text-xs font-semibold uppercase text-slate-700 dark:text-blue-300">
            {format(new Date(event.eventDateStart), "dd/MM/yyyy", {
              locale: ptBR,
            })}{" "}
            -{" "}
            {format(new Date(event.eventDateEnd), "dd/MM/yyyy", {
              locale: ptBR,
            })}{" "}
            |{event.address?.city || ""}, {event.address?.state || ""}
          </span>
          
        </div>
       
      </div>
    </Link> */}
      <Link key={eventID} href={`/event/${eventID}`} className="group">
        <Card className="overflow-hidden">
          <div className="aspect-square overflow-hidden">
            <Image
              src={bannerImage}
              alt={eventName}
              width={600}
              height={400}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold">{eventName}</h3>
            <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
              {/* {tags.map(({ text, id }) => (
                <span key={id}>{text}</span>
              ))} */}

              <span>•</span>
              {/* <span>{event.date}</span> */}

              <span>
                {" "}
                {format(new Date(eventDateStart), "dd/MM/yyyy", {
                  locale: ptBR,
                })}{" "}
                -{" "}
                {format(new Date(eventDateEnd), "dd/MM/yyyy", {
                  locale: ptBR,
                })}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {address?.city || ""}, {address?.state || ""}
            </p>
          </div>
        </Card>
      </Link>
    </>
  );
}
