"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const sportCategories = [
  {
    name: "Running",
    // icon: Running,
    image: "https://placeholder.pics/svg/100x100",
    color: "bg-red-100 dark:bg-red-900/20",
  },
  {
    name: "MTB",
    // icon: Bike,
    image: "https://placeholder.pics/svg/100x100",
    color: "bg-green-100 dark:bg-green-900/20",
  },
  {
    name: "Speed Bike",
    // icon: Bike,
    image: "https://placeholder.pics/svg/100x100",
    color: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    name: "Other",
    // icon: Dumbbell,
    image: "https://placeholder.pics/svg/100x100",
    color: "bg-purple-100 dark:bg-purple-900/20",
  },
];

export default function CategorySlider() {
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
    <section className="relative px-6 py-12 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold sm:text-3xl">Categorias</h2>
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
        <ScrollArea className="mt-6 whitespace-nowrap" ref={scrollContainerRef}>
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
                      {/* <Icon className="h-10 w-10 transition-transform group-hover:scale-110" /> */}
                    </div>
                  </div>
                  <span className="text-sm font-medium">{category.name}</span>
                </div>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>
    </section>
  );
}
