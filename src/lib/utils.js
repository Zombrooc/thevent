import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const api = axios.create({
  baseURL: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2`,
  maxBodyLength: Infinity,
  headers: {
    Accept: "application/json",
  },
});
