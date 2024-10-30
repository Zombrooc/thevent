import Image from "next/image";

// import running from "@/assets/running.jpg";
// import tennis from "@/assets/tennis.jpg";
// import beachtennis from "@/assets/beachtennis.webp";
// import muaythai from "@/assets/muaythai.jpg";
// import karate from "@/assets/karate.jpg";
// import mtb from "@/assets/mtb.jpg";

// import User from "./User";

import { Button } from "@/components/ui/button";

import EventCardGridList from "@/components/EventCardGrid/EventCardGridList";
import CategorySlider from "./_components/CategorySlider";

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
            Sua próxima vitória
            <span className="block text-primary">Começa Aqui</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
            Crie, descubra e participe de competições perto de você. De
            maratonas a campeonatos, encontre seu próximo desafio.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="text-lg">
              Criar Evento
            </Button>
            <Button size="lg" variant="outline" className="text-lg">
              Explorar Eventos
            </Button>
          </div>
        </div>
      </section>

      {/* Sports Categories Carousel */}
      <CategorySlider />

      {/* Featured Events Bento Grid */}
      <section className="px-6 py-12 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Eventos em Destaque{" "}
          </h2>
          <EventCardGridList />
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
