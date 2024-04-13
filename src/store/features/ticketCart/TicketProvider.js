"use client";

import { makeStore } from "@/store/store";
import { useRef } from "react";
import { Provider } from "react-redux";

import { initializeState } from "@/store/features/ticketCart/ticketCartSlice";

export default function TicketProvider({ initialState, children }) {
  const storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = makeStore();

    storeRef.current.dispatch(initializeState(initialState));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
