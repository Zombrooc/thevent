import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Suspense } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { Badge } from "@/components/ui/badge";
import moment from "moment";
import Image from "next/image";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const getEventData = async (id) => {
  const eventData = await prisma.event.findUnique({
    where: { id },
    include: {
      address: true,
      tags: true,
      tickets: true,
    },
  });

  return eventData;
};

export default async function EventDetails({ params }) {
  const eventData = await getEventData(params?.id);

  return (
    <>
      <div className="w-full rounded-xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 ">
        <Image
          alt="Map"
          className="object-cover max-w-5xl"
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
                  <CalendarIcon className="h-6 w-6" />
                  <time>
                    {moment(eventData.eventDataStart).format("DD/MM/YYYY")}
                  </time>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPinIcon className="h-6 w-6" />
                  <span>
                    {eventData.address.street} - {eventData.address.city},{" "}
                    {eventData.address.state}
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
              <div className="prose max-w-none mt-10">
                <p>{eventData.eventDescription}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 h-full flex flex-col">
          {" "}
          <h2 className=" mt-10 text-3xl font-semibold leading-7 text-gray-900">
            Ingressos
          </h2>
          <div className=" mt-4 flex flex-col gap-4">
            {eventData?.tickets.map((ticket, index) => (
              <Card className=" flex flex-col justify-between" key={index}>
                <CardHeader>
                  <CardTitle>{ticket.ticketName}</CardTitle>
                  <CardDescription>{ticket.ticketDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="font-semibold">
                    R$ <span className="text-2xl"> {ticket.ticketPrice}</span>
                  </span>
                  <div className="flex items-center justify-center space-x-2 mt-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-full"
                      // onClick={() => onClick(-10)}
                      // disabled={goal <= 200}
                    >
                      <MinusIcon className="h-4 w-4" />
                      <span className="sr-only">Decrease</span>
                    </Button>
                    <div className="flex-1 text-center">
                      <div className="text-2xl font-bold tracking-tighter">
                        5
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-full"
                      // onClick={() => onClick(10)}
                      // disabled={goal >= 400}
                    >
                      <PlusIcon className="h-4 w-4" />
                      <span className="sr-only">Increase</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function HeartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function MapPinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function MinusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
