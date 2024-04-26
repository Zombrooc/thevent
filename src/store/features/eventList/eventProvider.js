"use client";

import { makeStore } from "@/store/features/eventList/store";
import { useRef } from "react";
import { Provider } from "react-redux";

import { initializeState } from "@/store/features/eventList/eventListSlice";

export default function EventListProvider({ initialState, children }) {
  const storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = makeStore();

    storeRef.current.dispatch(initializeState(initialState));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
