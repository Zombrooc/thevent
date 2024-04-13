import { configureStore } from "@reduxjs/toolkit";
import ticketCartSlice from "./features/ticketCart/ticketCartSlice";

export const makeStore = () => {
  return configureStore({
    // reducer: {
    //   ticketCart: ticketCartSlice,
    // },
    reducer: { ticketCart: ticketCartSlice },
  });
};
