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
    image: "https://placeholder.pics/svg/600x400",
    category: "Running",
    date: "March 15, 2024",
    location: "Downtown",
    coordinates: { lat: 40.7128, lng: -74.006 },
    // icon: Running,
  },
  {
    title: "Mountain Bike Challenge",

    image: "https://placeholder.pics/svg/600x400",
    category: "MTB",
    date: "April 2, 2024",
    location: "Mountain Trail",
    coordinates: { lat: 40.758, lng: -73.9855 },
    // icon: Bike,
  },
  {
    title: "Speed Bike Race",
    image: "https://placeholder.pics/svg/600x400",
    category: "Speed Bike",
    date: "May 10, 2024",
    location: "City Circuit",
    coordinates: { lat: 40.7829, lng: -73.9654 },
    // icon: Bike,
  },
];

export default function Home() {
  return (
    <>
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
                src="https://placeholder.pics/svg/1600x900"
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
