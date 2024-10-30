"use client";

import Image from "next/image";

// import running from "@/assets/running.jpg";
// import tennis from "@/assets/tennis.jpg";
// import beachtennis from "@/assets/beachtennis.webp";
// import muaythai from "@/assets/muaythai.jpg";
// import karate from "@/assets/karate.jpg";
// import mtb from "@/assets/mtb.jpg";

import Link from "next/link";

import { cn } from "@/lib/utils";
// import User from "./User";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useRef } from "react";

const sportCategories = [
  {
    name: "Running",
    // icon: Running,
    image: "/placeholder.svg?height=100&width=100",
    color: "bg-red-100 dark:bg-red-900/20",
  },
  {
    name: "MTB",
    // icon: Bike,
    image: "/placeholder.svg?height=100&width=100",
    color: "bg-green-100 dark:bg-green-900/20",
  },
  {
    name: "Speed Bike",
    // icon: Bike,
    image: "/placeholder.svg?height=100&width=100",
    color: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    name: "Other",
    // icon: Dumbbell,
    image: "/placeholder.svg?height=100&width=100",
    color: "bg-purple-100 dark:bg-purple-900/20",
  },
];

const featuredEvents = [
  {
    title: "City Marathon 2024",
    image: "/placeholder.svg?height=400&width=600",
    category: "Running",
    date: "March 15, 2024",
    location: "Downtown",
    coordinates: { lat: 40.7128, lng: -74.006 },
    // icon: Running,
  },
  {
    title: "Mountain Bike Challenge",
    image: "/placeholder.svg?height=400&width=600",
    category: "MTB",
    date: "April 2, 2024",
    location: "Mountain Trail",
    coordinates: { lat: 40.758, lng: -73.9855 },
    // icon: Bike,
  },
  {
    title: "Speed Bike Race",
    image: "/placeholder.svg?height=400&width=600",
    category: "Speed Bike",
    date: "May 10, 2024",
    location: "City Circuit",
    coordinates: { lat: 40.7829, lng: -73.9654 },
    // icon: Bike,
  },
];

// import SearchEventInput from "./_components/search-event-input";
// import EventCardList from "@/components/EventCard/EventCardList";
// import { Suspense } from "react";
// import { BentoGrid, BentoGridItem } from "@/components/BentoGrid";
// import { Skeleton } from "@/components/ui/skeleton";
// import Container from "@/components/Container";

// const bentogridItems = [
//   {
//     title: "Corrida de Rua",
//     description:
//       "Sinta a adrenalina e a liberdade ao correr pelas ruas da cidade.",
//     header: (
//       <Image
//         alt="Alt text"
//         src={running}
//         className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"
//       />
//     ),
//     destination: "/corrida-de-rua",
//   },
//   {
//     title: "Tênis",
//     description: "Desafie seus limites e participe de emocionantes partidas.",
//     header: (
//       <Image
//         src={tennis}
//         alt="Alt text"
//         className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"
//       />
//     ),
//     destination: "/tenis",
//   },
//   {
//     title: "Beach Tennis",
//     description: "Experimente a energia do jogo nas mais belas praias.",
//     header: (
//       <Image
//         src={beachtennis}
//         alt="Alt text"
//         className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"
//       />
//     ),
//     destination: "/beach-tennis",
//   },
//   {
//     title: "Muay Thai",
//     description: "Teste sua força e habilidade no intenso mundo do Muay Thai.",
//     header: (
//       <Image
//         src={muaythai}
//         alt="Alt text"
//         className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"
//       />
//     ),
//     destination: "/muay-thai",
//   },
//   {
//     title: "Karatê",
//     description:
//       "Junte-se a corredores de todo o mundo em uma desafiadora maratona.",
//     header: (
//       <Image
//         src={karate}
//         alt="Alt text"
//         className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"
//       />
//     ),
//     destination: "/karate",
//   },
//   {
//     title: "Empresarial",
//     description: "Mostre suas habilidades no campo e conquiste a vitória.",
//     header: (
//       <Skeleton className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100" />
//     ),
//     destination: "/empresarial",
//   },
//   {
//     title: "MTB",
//     description: "Explore trilhas desafiadoras e paisagens incríveis.",
//     header: (
//       <Image
//         src={mtb}
//         alt="Alt text"
//         className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"
//       />
//     ),
//     destination: "/mtb",
//   },
// ];

export default function Home() {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };
  return (
    <>
      {/* <>
       <div className="min-h-full min-w-full ">
         <div className="overflow-hidden">
           <Container>
             <div className="relative mx-auto max-w-4xl grid space-y-4 sm:space-y-10">
               <div className="mt-5 max-w-2xl text-center mx-auto">
                 <h1 className="block font-bold text-gray-800 text-5xl md:text-5xl lg:text-6xl dark:text-gray-200">
                   Viva
                   <span className="bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent">
                     {" "}
                     a emoção!
                   </span>
                 </h1>
               </div>

               <div className="mt-5 max-w-3xl text-center mx-auto">
                 <p className="text-xl text-gray-600 dark:text-gray-400">
                   Seja o herói do seu próprio esporte, supere os limites e faça
                   sua história acontecer.
                 </p>
               </div>
               <SearchEventInput />
             </div>
           </Container>
         </div>
       </div>

       <Suspense fallback={<Container>Loading...</Container>}>
         <EventCardList />
       </Suspense>

       <div className="mt-10 max-w-4xl mx-auto">
         <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
           Categorias
         </h2>
         <hr className="border-t border-gray-200 dark:border-gray-700 my-3" />

         <BentoGrid>
           {bentogridItems.map((item, i) => (
             <BentoGridItem
               key={i}
               title={item.title}
               description={item.description}
               header={item.header}
               icon={item.icon}
               destination={item.destination}
               className={i === 3 || i === 6 ? "md:col-span-2" : ""}
             />
           ))}
         </BentoGrid>
       </div>
     </> */}
      <section className="relative overflow-hidden bg-muted px-6 py-24 sm:px-8 sm:py-32">
        <div className="absolute inset-0 z-0 opacity-40">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0 0 0 / 0.2) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Your Next Sports Event
            <span className="block text-primary">Starts Here</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
            Create, discover, and participate in sports events near you. From
            marathons to championships, find your next challenge.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="text-lg">
              Create Event
            </Button>
            <Button size="lg" variant="outline" className="text-lg">
              Explore Events
            </Button>
          </div>
        </div>
      </section>

      {/* Sports Categories Carousel */}
      <section className="relative px-6 py-12 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Sports Categories
            </h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("left")}
                className="hidden sm:flex"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("right")}
                className="hidden sm:flex"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {/* <ScrollArea
            className="mt-6 whitespace-nowrap"
            ref={scrollContainerRef}
          >
            <div className="flex gap-6">
              {sportCategories.map((category) => {
                // const Icon = category.icon;
                return (
                  <div
                    key={category.name}
                    className="inline-flex flex-col items-center gap-3"
                  >
                    <div
                      className={cn(
                        "group relative aspect-square w-24 overflow-hidden rounded-full transition-all hover:shadow-lg",
                        category.color
                      )}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon className="h-10 w-10 transition-transform group-hover:scale-110" />
                      </div>
                    </div>
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" className="hidden" />
          </ScrollArea> */}
        </div>
      </section>

      {/* Featured Events Bento Grid */}
      <section className="px-6 py-12 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold sm:text-3xl">Featured Events</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredEvents.map((event) => (
              <Link key={event.title} href="#" className="group">
                <Card className="overflow-hidden">
                  <div className="aspect-[4/3] overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      width={600}
                      height={400}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{event.title}</h3>
                    <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{event.category}</span>
                      <span>•</span>
                      <span>{event.date}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {event.location}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Events Map Section */}
      <section className="px-6 py-12 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold sm:text-3xl">Events Near You</h2>
          <div className="mt-6 relative rounded-xl overflow-hidden">
            <div className="aspect-[16/9] bg-muted relative">
              <Image
                src="/placeholder.svg?height=900&width=1600"
                alt="Map"
                fill
                className="object-cover"
              />
              {featuredEvents.map((event, index) => {
                // const Icon = event.icon;
                const left = `${(event.coordinates.lng + 74.1) * 100}%`;
                const top = `${(40.8 - event.coordinates.lat) * 100}%`;

                return (
                  <div
                    key={index}
                    className="absolute -translate-x-1/2 -translate-y-1/2 animate-bounce"
                    style={{ left, top }}
                  >
                    <div className="relative group">
                      <div className="absolute -top-16 left-1/2 -translate-x-1/2 hidden group-hover:block bg-background border rounded-lg p-2 shadow-lg whitespace-nowrap">
                        <p className="text-sm font-medium">{event.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {event.location}
                        </p>
                      </div>
                      {/* <div className="bg-primary text-primary-foreground p-2 rounded-full shadow-lg">
                        <Icon className="h-4 w-4" />
                      </div> */}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
