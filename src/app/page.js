import Image from "next/image";
import { getSession } from "@auth0/nextjs-auth0";

import Navbar from "@/components/Navbar";

import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";

import SearchEventInput from "./_components/search-event-input";
import EventCardList from "@/components/EventCard/EventCardList";
import { Suspense } from "react";
import { BentoGrid, BentoGridItem } from "@/components/BentoGrid";
import { Skeleton } from "@/components/ui/skeleton";

const bentogridItems = [
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: (
      <Skeleton className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100" />
    ),
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    header: (
      <Skeleton className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100" />
    ),
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: (
      <Skeleton className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100" />
    ),
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",
    header: (
      <Skeleton className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100" />
    ),
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Pursuit of Knowledge",
    description: "Join the quest for understanding and enlightenment.",
    header: (
      <Skeleton className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100" />
    ),
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Joy of Creation",
    description: "Experience the thrill of bringing ideas to life.",
    header: (
      <Skeleton className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100" />
    ),
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",
    header: (
      <Skeleton className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100" />
    ),
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
];

export default async function Home() {
  const session = await getSession();

  return (
    <>
      <Navbar user={session?.user} />
      <div className="min-h-full min-w-full ">
        <div className="overflow-hidden">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-12">
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
          </div>
        </div>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <EventCardList />
      </Suspense>

      <div className="mt-10 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
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
              className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>
      </div>
    </>
  );
}
