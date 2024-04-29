"use server";

import { cookies } from "next/headers";

export const setCurrentEvent = (event) => {
  const cookieStore = cookies();

  cookieStore.set("currentEvent", event);
};
