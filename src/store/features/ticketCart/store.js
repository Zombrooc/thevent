import { configureStore } from "@reduxjs/toolkit";
import ticketCartSlice from "./ticketCartSlice";

export const makeStore = () => {
  return configureStore({
    reducer: { ticketCart: ticketCartSlice },
  });
};
