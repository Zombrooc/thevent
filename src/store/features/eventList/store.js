import { configureStore } from "@reduxjs/toolkit";
import eventListSlice from "../eventList/eventListSlice";

export const makeStore = () => {
  return configureStore({
    reducer: { eventList: eventListSlice },
  });
};
