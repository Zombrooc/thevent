import { configureStore } from "@reduxjs/toolkit";

import ticketCartReducer from "./features/ticketCart/ticketCartSlice";

export default configureStore({
  reducer: {
    ticketCart: ticketCartReducer,
  },
});
