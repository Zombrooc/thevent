import { configureStore } from "@reduxjs/toolkit";
import ticketCartSlice from "./features/ticketCart/ticketCartSlice";

export default configureStore({
  reducer: {
    ticketCart: ticketCartSlice,
  },
});
