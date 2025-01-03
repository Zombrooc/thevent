"use server";

import { cookies } from "next/headers";
import { addMinutes } from "date-fns";

export const insertIntoCookies = async (name, cookieData) => {
  const cookieStore = await cookies();

  const expiryDate = addMinutes(new Date(), 15);

  cookieStore.set({
    name: name,
    value: JSON.stringify(cookieData),
    expires: expiryDate,
  });
};

export const removeCookies = async (name) => {
  (await cookies()).delete(name);
};

export const getCookies = async (name) => {
  const { value } = (await cookies()).get(name);

  console.log("Cookie: ", value);

  return value ? JSON.parse(value) : null;
};
