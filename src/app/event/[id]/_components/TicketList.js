"use client";

import TicketItem from "./TicketItem";
import ConfirmPurchase from "./ConfirmPurchase";
import { useSelector } from "react-redux";

export default function TicketList({ tickets }) {
  const { totalPrice } = useSelector((state) => state.ticketCart);
  return (
    <div className="col-span-2 h-full flex flex-col">
      <h2 className=" mt-10 text-3xl font-semibold leading-7 text-gray-900">
        Ingressos
      </h2>
      <div className=" mt-4 flex flex-col gap-4">
        {tickets.map((ticket) => (
          <TicketItem ticket={ticket} key={ticket.id} />
        ))}

        <p className="text-lg font-semibold">Preço Total: R$ {totalPrice}</p>
        <ConfirmPurchase />
      </div>
    </div>
  );
}
