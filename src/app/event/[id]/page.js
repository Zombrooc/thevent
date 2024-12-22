import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";

import TicketList from "./_components/TicketList";

import { CalendarDaysIcon, MapPinnedIcon } from "lucide-react";
import { Suspense } from "react";

const getEventData = async (eventID) => {
  const res = await fetch(
    `${process.env.VERCEL_PROJECT_PRODUCTION_URL}/api/events/${eventID}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  if (res.status === 200) {
    const events = await res.json();

    return events;
  } else {
    return { error: 404 };
  }
};

const incrementPageViews = async (eventId) => {
  await fetch(
    `${process.env.VERCEL_PROJECT_PRODUCTION_URL}/api/analytics/${eventId}/increment-views`,
    {
      method: "POST",
    }
  );

  return;
};

export default async function EventDetails({ params }) {
  const { id } = await params;

  const { eventData, error } = await getEventData(id);
  await incrementPageViews(id);

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
              blurDataURL={eventData.bannerImage}
            />
          </div>
          <div className="max-w-5xl min-h-screen bg-muted/40 bg-white mx-auto px-4 sm:px-6 lg:px-8 pt-12 grid grid-cols-1 gap-x-5 gap-y-3 sm:grid-cols-6  ">
            <div className="col-span-4">
              <div className="w-full">
                <div className="space-y-2">
                  <div className="flex rounded-lg py-1 text-base ">
                    {eventData?.tags.map((tag, index) => (
                      <Badge key={index} className="mr-2 capitalize">
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
                        {format(
                          new Date(eventData.eventDateStart),
                          "dd/MM/yyyy",
                          {
                            locale: ptBR,
                          }
                        )}{" "}
                        {eventData?.eventDateEnd &&
                          format(
                            new Date(eventData.eventDateEnd),
                            "dd/MM/yyyy",
                            {
                              locale: ptBR,
                            }
                          )}
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
            {/* <TicketProvider initialState={eventData.tickets}> */}

            <Suspense fallback={<span> Loading... </span>}>
              <TicketList tickets={eventData.tickets} />
            </Suspense>

            {/* </TicketProvider> */}
          </div>
        </>
      )}

      {error && <> Nenhum evento encontrado.</>}
    </>
  );
}
// 'use client'

// import { useState } from 'react'
// import Image from 'next/image'
// import Link from 'next/link'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
// import { Progress } from "@/components/ui/progress"
// import { MapPin, Calendar, Clock, Download, Plus, Minus, Users, ChevronRight, Share2, Heart, MessageCircle } from 'lucide-react'

// // Mock data for the event (same as before)
// const event = {
//   id: '1',
//   name: 'City Marathon 2024',
//   image: '/placeholder.svg?height=400&width=800',
//   address: {
//     street: 'Main Street',
//     number: '123',
//     neighborhood: 'Downtown',
//     city: 'Metropolis',
//     state: 'State'
//   },
//   category: 'Running',
//   startDate: 'March 15, 2024',
//   endDate: 'March 15, 2024',
//   startTime: '7:00 AM',
//   endTime: '2:00 PM',
//   description: `
//     <h2>Join us for the City Marathon 2024!</h2>
//     <p>Get ready for an exhilarating run through the heart of our beautiful city. This year's marathon promises to be bigger and better than ever, with a scenic route that showcases our city's most iconic landmarks.</p>
//     <img src="/placeholder.svg?height=300&width=600" alt="Marathon route map" />
//     <h3>What to expect:</h3>
//     <ul>
//       <li>Professional timing system</li>
//       <li>Hydration stations every 2 miles</li>
//       <li>Post-race celebration with live music</li>
//       <li>Finisher medals for all participants</li>
//     </ul>
//     <p>Don't miss out on this incredible event that brings our community together in the spirit of fitness and fun!</p>
//   `,
//   tickets: [
//     { id: '1', name: 'Early Bird', price: 50, available: 100, sold: 75 },
//     { id: '2', name: 'Regular', price: 75, available: 500, sold: 200 },
//     { id: '3', name: 'VIP', price: 150, available: 50, sold: 10 }
//   ],
//   documents: [
//     { name: 'Event Regulations', url: '/documents/regulations.pdf' },
//     { name: 'Waiver Form', url: '/documents/waiver.pdf' }
//   ],
//   attendees: [
//     { id: '1', name: 'John Doe', avatar: '/placeholder.svg?height=32&width=32' },
//     { id: '2', name: 'Jane Smith', avatar: '/placeholder.svg?height=32&width=32' },
//     // ... more attendees
//   ],
//   relatedEvents: [
//     { id: '2', name: 'City 5K Run', image: '/placeholder.svg?height=200&width=300', date: 'April 5, 2024' },
//     { id: '3', name: 'Charity Walk', image: '/placeholder.svg?height=200&width=300', date: 'May 20, 2024' },
//     { id: '4', name: 'Trail Running Challenge', image: '/placeholder.svg?height=200&width=300', date: 'June 10, 2024' },
//   ],
//   organizer: {
//     name: 'City Sports Association',
//     logo: '/placeholder.svg?height=64&width=64',
//     description: 'Promoting health and fitness in our community since 1990.'
//   }
// }

// export default function EventDetails() {
//   const [ticketCounts, setTicketCounts] = useState<Record<string, number>>(
//     Object.fromEntries(event.tickets.map(ticket => [ticket.id, 0]))
//   )

//   const handleTicketChange = (ticketId: string, change: number) => {
//     setTicketCounts(prev => ({
//       ...prev,
//       [ticketId]: Math.max(0, prev[ticketId] + change)
//     }))
//   }

//   const totalCost = event.tickets.reduce((sum, ticket) =>
//     sum + ticket.price * ticketCounts[ticket.id], 0
//   )

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       <main className="container mx-auto px-4 py-8">
//         {/* Event Header */}
//         <div className="mb-8">
//           <div className="relative aspect-video overflow-hidden rounded-lg">
//             <Image
//               src={event.image}
//               alt={event.name}
//               fill
//               className="object-cover"
//             />
//           </div>
//           <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
//             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{event.name}</h1>
//             <div className="mt-2 flex flex-wrap items-center gap-4">
//               <Badge variant="secondary">{event.category}</Badge>
//               <div className="flex items-center text-gray-600 dark:text-gray-400">
//                 <MapPin className="mr-1 h-4 w-4" />
//                 <span>{`${event.address.street}, ${event.address.number}, ${event.address.neighborhood}, ${event.address.city}, ${event.address.state}`}</span>
//               </div>
//               <div className="flex items-center text-gray-600 dark:text-gray-400">
//                 <Calendar className="mr-1 h-4 w-4" />
//                 <span>{`${event.startDate} - ${event.endDate}`}</span>
//               </div>
//               <div className="flex items-center text-gray-600 dark:text-gray-400">
//                 <Clock className="mr-1 h-4 w-4" />
//                 <span>{`${event.startTime} - ${event.endTime}`}</span>
//               </div>
//             </div>
//             <div className="mt-4 flex gap-4">
//               <Button>
//                 <Share2 className="mr-2 h-4 w-4" />
//                 Share
//               </Button>
//               <Button variant="outline">
//                 <Heart className="mr-2 h-4 w-4" />
//                 Interested
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Event Details and Ticket Selection */}
//         <div className="mb-8 grid gap-8 lg:grid-cols-3">
//           <div className="lg:col-span-2">
//             <Tabs defaultValue="description" className="mb-8">
//               <TabsList>
//                 <TabsTrigger value="description">Description</TabsTrigger>
//                 <TabsTrigger value="attendees">Attendees</TabsTrigger>
//                 <TabsTrigger value="organizer">Organizer</TabsTrigger>
//               </TabsList>
//               <TabsContent value="description">
//                 <Card>
//                   <CardContent className="prose dark:prose-invert max-w-none pt-6">
//                     <div dangerouslySetInnerHTML={{ __html: event.description }} />
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//               <TabsContent value="attendees">
//                 <Card>
//                   <CardContent className="pt-6">
//                     <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
//                       {event.attendees.map(attendee => (
//                         <div key={attendee.id} className="flex items-center space-x-2">
//                           <Avatar>
//                             <AvatarImage src={attendee.avatar} alt={attendee.name} />
//                             <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
//                           </Avatar>
//                           <span className="text-sm">{attendee.name}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//               <TabsContent value="organizer">
//                 <Card>
//                   <CardContent className="pt-6">
//                     <div className="flex items-center gap-4">
//                       <Image
//                         src={event.organizer.logo}
//                         alt={event.organizer.name}
//                         width={64}
//                         height={64}
//                         className="rounded-full"
//                       />
//                       <div>
//                         <h3 className="text-lg font-semibold">{event.organizer.name}</h3>
//                         <p className="text-sm text-gray-600 dark:text-gray-400">{event.organizer.description}</p>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//             </Tabs>

//             {/* Documents Section */}
//             <Card className="mb-8">
//               <CardHeader>
//                 <CardTitle>Event Documents</CardTitle>
//                 <CardDescription>Download important event information</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-2">
//                   {event.documents.map(doc => (
//                     <Button key={doc.name} variant="outline" className="w-full justify-start" asChild>
//                       <Link href={doc.url}>
//                         <Download className="mr-2 h-4 w-4" />
//                         {doc.name}
//                       </Link>
//                     </Button>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Ticket Selection */}
//           <div>
//             <Card className="sticky top-4">
//               <CardHeader>
//                 <CardTitle>Select Tickets</CardTitle>
//                 <CardDescription>Choose the number of tickets you want to purchase</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <Accordion type="single" collapsible className="w-full">
//                   {event.tickets.map(ticket => (
//                     <AccordionItem key={ticket.id} value={ticket.id}>
//                       <AccordionTrigger>
//                         <div className="flex w-full justify-between">
//                           <span>{ticket.name}</span>
//                           <span>${ticket.price}</span>
//                         </div>
//                       </AccordionTrigger>
//                       <AccordionContent>
//                         <div className="space-y-2">
//                           <div className="flex items-center justify-between">
//                             <span className="text-sm text-gray-600 dark:text-gray-400">
//                               {ticket.available - ticket.sold} remaining
//                             </span>
//                             <div className="flex items-center space-x-2">
//                               <Button
//                                 variant="outline"
//                                 size="icon"
//                                 onClick={() => handleTicketChange(ticket.id, -1)}
//                                 disabled={ticketCounts[ticket.id] === 0}
//                               >
//                                 <Minus className="h-4 w-4" />
//                               </Button>
//                               <span className="w-8 text-center">{ticketCounts[ticket.id]}</span>
//                               <Button
//                                 variant="outline"
//                                 size="icon"
//                                 onClick={() => handleTicketChange(ticket.id, 1)}
//                                 disabled={ticketCounts[ticket.id] === ticket.available - ticket.sold}
//                               >
//                                 <Plus className="h-4 w-4" />
//                               </Button>
//                             </div>
//                           </div>
//                           <Progress value={(ticket.sold / ticket.available) * 100} />
//                         </div>
//                       </AccordionContent>
//                     </AccordionItem>
//                   ))}
//                 </Accordion>
//               </CardContent>
//               <CardFooter className="flex flex-col items-stretch gap-4">
//                 <div className="flex justify-between text-lg font-semibold">
//                   <span>Total:</span>
//                   <span>${totalCost}</span>
//                 </div>
//                 <Button className="w-full" disabled={totalCost === 0}>Buy Tickets</Button>
//               </CardFooter>
//             </Card>
//           </div>
//         </div>

//         {/* Related Events */}
//         <section>
//           <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Related Events</h2>
//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {event.relatedEvents.map(relatedEvent => (
//               <Card key={relatedEvent.id}>
//                 <div className="aspect-video relative">
//                   <Image
//                     src={relatedEvent.image}
//                     alt={relatedEvent.name}
//                     fill
//                     className="object-cover rounded-t-lg"
//                   />
//                 </div>
//                 <CardContent className="p-4">
//                   <h3 className="font-semibold">{relatedEvent.name}</h3>
//                   <p className="text-sm text-gray-600 dark:text-gray-400">{relatedEvent.date}</p>
//                 </CardContent>
//                 <CardFooter>
//                   <Button variant="ghost" className="w-full" asChild>
//                     <Link href={`/events/${relatedEvent.id}`}>
//                       View Event
//                       <ChevronRight className="ml-2 h-4 w-4" />
//                     </Link>
//                   </Button>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         </section>
//       </main>
//     </div>
//   )
// }

// 'use client'

// import { useState } from 'react'
// import Image from 'next/image'
// import Link from 'next/link'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
// import { Progress } from "@/components/ui/progress"
// import { MapPin, Calendar, Clock, Download, Plus, Minus, Users, ChevronRight, Share2, Heart, MessageCircle, Ticket } from 'lucide-react'

// // Mock data for the event (same as before)
// const event = {
//   id: '1',
//   name: 'City Marathon 2024',
//   image: '/placeholder.svg?height=400&width=800',
//   address: {
//     street: 'Main Street',
//     number: '123',
//     neighborhood: 'Downtown',
//     city: 'Metropolis',
//     state: 'State'
//   },
//   category: 'Running',
//   startDate: 'March 15, 2024',
//   endDate: 'March 15, 2024',
//   startTime: '7:00 AM',
//   endTime: '2:00 PM',
//   description: `
//     <h2>Join us for the City Marathon 2024!</h2>
//     <p>Get ready for an exhilarating run through the heart of our beautiful city. This year's marathon promises to be bigger and better than ever, with a scenic route that showcases our city's most iconic landmarks.</p>
//     <img src="/placeholder.svg?height=300&width=600" alt="Marathon route map" />
//     <h3>What to expect:</h3>
//     <ul>
//       <li>Professional timing system</li>
//       <li>Hydration stations every 2 miles</li>
//       <li>Post-race celebration with live music</li>
//       <li>Finisher medals for all participants</li>
//     </ul>
//     <p>Don't miss out on this incredible event that brings our community together in the spirit of fitness and fun!</p>
//   `,
//   tickets: [
//     { id: '1', name: 'Early Bird', price: 50, available: 100, sold: 75 },
//     { id: '2', name: 'Regular', price: 75, available: 500, sold: 200 },
//     { id: '3', name: 'VIP', price: 150, available: 50, sold: 10 }
//   ],
//   documents: [
//     { name: 'Event Regulations', url: '/documents/regulations.pdf' },
//     { name: 'Waiver Form', url: '/documents/waiver.pdf' }
//   ],
//   attendees: [
//     { id: '1', name: 'John Doe', avatar: '/placeholder.svg?height=32&width=32' },
//     { id: '2', name: 'Jane Smith', avatar: '/placeholder.svg?height=32&width=32' },
//     // ... more attendees
//   ],
//   relatedEvents: [
//     { id: '2', name: 'City 5K Run', image: '/placeholder.svg?height=200&width=300', date: 'April 5, 2024' },
//     { id: '3', name: 'Charity Walk', image: '/placeholder.svg?height=200&width=300', date: 'May 20, 2024' },
//     { id: '4', name: 'Trail Running Challenge', image: '/placeholder.svg?height=200&width=300', date: 'June 10, 2024' },
//   ],
//   organizer: {
//     name: 'City Sports Association',
//     logo: '/placeholder.svg?height=64&width=64',
//     description: 'Promoting health and fitness in our community since 1990.'
//   },
//   ticketBuyers: [
//     { id: '1', name: 'Alice Johnson', avatar: '/placeholder.svg?height=32&width=32', ticketType: 'Early Bird' },
//     { id: '2', name: 'Bob Williams', avatar: '/placeholder.svg?height=32&width=32', ticketType: 'Regular' },
//     { id: '3', name: 'Carol Davis', avatar: '/placeholder.svg?height=32&width=32', ticketType: 'VIP' },
//     { id: '4', name: 'David Brown', avatar: '/placeholder.svg?height=32&width=32', ticketType: 'Regular' },
//     { id: '5', name: 'Eva Martinez', avatar: '/placeholder.svg?height=32&width=32', ticketType: 'Early Bird' },
//     // ... more ticket buyers
//   ]
// }

// export default function EventDetails() {
//   const [ticketCounts, setTicketCounts] = useState<Record<string, number>>(
//     Object.fromEntries(event.tickets.map(ticket => [ticket.id, 0]))
//   )

//   const handleTicketChange = (ticketId: string, change: number) => {
//     setTicketCounts(prev => ({
//       ...prev,
//       [ticketId]: Math.max(0, prev[ticketId] + change)
//     }))
//   }

//   const totalCost = event.tickets.reduce((sum, ticket) =>
//     sum + ticket.price * ticketCounts[ticket.id], 0
//   )

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       <main className="container mx-auto px-4 py-8">
//         {/* Event Header */}
//         <div className="mb-8">
//           <div className="relative aspect-video overflow-hidden rounded-lg">
//             <Image
//               src={event.image}
//               alt={event.name}
//               fill
//               className="object-cover"
//             />
//           </div>
//           <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
//             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{event.name}</h1>
//             <div className="mt-2 flex flex-wrap items-center gap-4">
//               <Badge variant="secondary">{event.category}</Badge>
//               <div className="flex items-center text-gray-600 dark:text-gray-400">
//                 <MapPin className="mr-1 h-4 w-4" />
//                 <span>{`${event.address.street}, ${event.address.number}, ${event.address.neighborhood}, ${event.address.city}, ${event.address.state}`}</span>
//               </div>
//               <div className="flex items-center text-gray-600 dark:text-gray-400">
//                 <Calendar className="mr-1 h-4 w-4" />
//                 <span>{`${event.startDate} - ${event.endDate}`}</span>
//               </div>
//               <div className="flex items-center text-gray-600 dark:text-gray-400">
//                 <Clock className="mr-1 h-4 w-4" />
//                 <span>{`${event.startTime} - ${event.endTime}`}</span>
//               </div>
//             </div>
//             <div className="mt-4 flex gap-4">
//               <Button>
//                 <Share2 className="mr-2 h-4 w-4" />
//                 Share
//               </Button>
//               <Button variant="outline">
//                 <Heart className="mr-2 h-4 w-4" />
//                 Interested
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Event Details and Ticket Selection */}
//         <div className="mb-8 grid gap-8 lg:grid-cols-3">
//           <div className="lg:col-span-2">
//             <Tabs defaultValue="description" className="mb-8">
//               <TabsList>
//                 <TabsTrigger value="description">Description</TabsTrigger>
//                 <TabsTrigger value="attendees">Attendees</TabsTrigger>
//                 <TabsTrigger value="organizer">Organizer</TabsTrigger>
//               </TabsList>
//               <TabsContent value="description">
//                 <Card>
//                   <CardContent className="prose dark:prose-invert max-w-none pt-6">
//                     <div dangerouslySetInnerHTML={{ __html: event.description }} />
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//               <TabsContent value="attendees">
//                 <Card>
//                   <CardContent className="pt-6">
//                     <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
//                       {event.attendees.map(attendee => (
//                         <div key={attendee.id} className="flex items-center space-x-2">
//                           <Avatar>
//                             <AvatarImage src={attendee.avatar} alt={attendee.name} />
//                             <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
//                           </Avatar>
//                           <span className="text-sm">{attendee.name}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//               <TabsContent value="organizer">
//                 <Card>
//                   <CardContent className="pt-6">
//                     <div className="flex items-center gap-4">
//                       <Image
//                         src={event.organizer.logo}
//                         alt={event.organizer.name}
//                         width={64}
//                         height={64}
//                         className="rounded-full"
//                       />
//                       <div>
//                         <h3 className="text-lg font-semibold">{event.organizer.name}</h3>
//                         <p className="text-sm text-gray-600 dark:text-gray-400">{event.organizer.description}</p>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//             </Tabs>

//             {/* Ticket Buyers Section */}
//             <Card className="mb-8">
//               <CardHeader>
//                 <CardTitle>Recent Ticket Buyers</CardTitle>
//                 <CardDescription>See who's already signed up for the event</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
//                   {event.ticketBuyers.map(buyer => (
//                     <div key={buyer.id} className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
//                       <Avatar>
//                         <AvatarImage src={buyer.avatar} alt={buyer.name} />
//                         <AvatarFallback>{buyer.name.charAt(0)}</AvatarFallback>
//                       </Avatar>
//                       <div>
//                         <p className="text-sm font-medium">{buyer.name}</p>
//                         <p className="text-xs text-gray-500 dark:text-gray-400">{buyer.ticketType}</p>
//                       </div>
//                       <Ticket className="ml-auto h-4 w-4 text-gray-400" />
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Documents Section */}
//             <Card className="mb-8">
//               <CardHeader>
//                 <CardTitle>Event Documents</CardTitle>
//                 <CardDescription>Download important event information</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-2">
//                   {event.documents.map(doc => (
//                     <Button key={doc.name} variant="outline" className="w-full justify-start" asChild>
//                       <Link href={doc.url}>
//                         <Download className="mr-2 h-4 w-4" />
//                         {doc.name}
//                       </Link>
//                     </Button>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Ticket Selection */}
//           <div>
//             <Card className="sticky top-4">
//               <CardHeader>
//                 <CardTitle>Select Tickets</CardTitle>
//                 <CardDescription>Choose the number of tickets you want to purchase</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <Accordion type="single" collapsible className="w-full">
//                   {event.tickets.map(ticket => (
//                     <AccordionItem key={ticket.id} value={ticket.id}>
//                       <AccordionTrigger>
//                         <div className="flex w-full justify-between">
//                           <span>{ticket.name}</span>
//                           <span>${ticket.price}</span>
//                         </div>
//                       </AccordionTrigger>
//                       <AccordionContent>
//                         <div className="space-y-2">
//                           <div className="flex items-center justify-between">
//                             <span className="text-sm text-gray-600 dark:text-gray-400">
//                               {ticket.available - ticket.sold} remaining
//                             </span>
//                             <div className="flex items-center space-x-2">
//                               <Button
//                                 variant="outline"
//                                 size="icon"
//                                 onClick={() => handleTicketChange(ticket.id, -1)}
//                                 disabled={ticketCounts[ticket.id] === 0}
//                               >
//                                 <Minus className="h-4 w-4" />
//                               </Button>
//                               <span className="w-8 text-center">{ticketCounts[ticket.id]}</span>
//                               <Button
//                                 variant="outline"
//                                 size="icon"
//                                 onClick={() => handleTicketChange(ticket.id, 1)}
//                                 disabled={ticketCounts[ticket.id] === ticket.available - ticket.sold}
//                               >
//                                 <Plus className="h-4 w-4" />
//                               </Button>
//                             </div>
//                           </div>
//                           <Progress value={(ticket.sold / ticket.available) * 100} />
//                         </div>
//                       </AccordionContent>
//                     </AccordionItem>
//                   ))}
//                 </Accordion>
//               </CardContent>
//               <CardFooter className="flex flex-col items-stretch gap-4">
//                 <div className="flex justify-between text-lg font-semibold">
//                   <span>Total:</span>
//                   <span>${totalCost}</span>
//                 </div>
//                 <Button className="w-full" disabled={totalCost === 0}>Buy Tickets</Button>
//               </CardFooter>
//             </Card>
//           </div>
//         </div>

//         {/* Related Events */}
//         <section>
//           <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Related Events</h2>
//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

//             {event.relatedEvents.map(relatedEvent => (
//               <Card key={relatedEvent.id}>
//                 <div className="aspect-video relative">
//                   <Image
//                     src={relatedEvent.image}
//                     alt={relatedEvent.name}
//                     fill
//                     className="object-cover rounded-t-lg"
//                   />
//                 </div>
//                 <CardContent className="p-4">
//                   <h3 className="font-semibold">{relatedEvent.name}</h3>
//                   <p className="text-sm text-gray-600 dark:text-gray-400">{relatedEvent.date}</p>
//                 </CardContent>
//                 <CardFooter>
//                   <Button variant="ghost" className="w-full" asChild>
//                     <Link href={`/events/${relatedEvent.id}`}>
//                       View Event
//                       <ChevronRight className="ml-2 h-4 w-4" />
//                     </Link>
//                   </Button>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         </section>
//       </main>
//     </div>
//   )
// }
