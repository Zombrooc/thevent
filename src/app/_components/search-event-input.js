"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SearchEventInput() {
  return (
    <form className="flex gap-2">
      <div className="flex-[1_0_0%]">
        <Label
          htmlFor="searchEvent"
          className="block text-sm text-gray-700 font-medium dark:text-white"
        >
          <span className="sr-only">Procurar evento</span>
        </Label>
        <Input
          type="text"
          name="event"
          id="searchEvent"
          className="h-[40px] bg-white py-1 px-4 w-full rounded-lg border-transparent border-b-primary focus:border-primary focus:ring-primary dark:bg-primary dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
          placeholder="Procurar evento"
        />
      </div>
      <div className="flex-[0_0_auto]">
        <Button
          type="submit"
          className="size-[40px] p-1 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </Button>
      </div>
    </form>
  );
}
