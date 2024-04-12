"use client";

import { Button } from "@/components/ui/button";
import TicketItem from "./TicketItem";
import { useDispatch, useSelector } from "react-redux";

export default function TicketList({ tickets }) {
  const ticketCart = useSelector((state) => state.ticketCart.tickets);
  const dispatch = useDispatch();

  const handleCheckout = () => {
    console.log(ticketCart);

    const res 
  };

  return (
    <div className="col-span-2 h-full flex flex-col">
      <h2 className=" mt-10 text-3xl font-semibold leading-7 text-gray-900">
        Ingressos
      </h2>
      <div className=" mt-4 flex flex-col gap-4">
        {tickets.map((ticket) => (
          <TicketItem ticket={ticket} key={ticket.id} />
        ))}
        <Button onClick={handleCheckout}> Comprar </Button>
      </div>
    </div>
  );
}
