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
  } = eventDetails;

  return (
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
  );
}
