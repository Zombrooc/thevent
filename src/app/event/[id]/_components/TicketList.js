"use client";

import TicketItem from "./TicketItem";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { startPurchaseAction } from "../_actions/startPurchaseAction";
import { useParams } from "next/navigation";

export default function TicketList({ tickets, isAuth }) {
  const params = useParams();
  const { id: eventID } = params;

  const { tickets: ticketCart, totalPrice } = useSelector(
    (state) => state.ticketCart
  );

  // useEffect(() => {
  //   if (ticketCart !== null) {
  //     localStorage.setItem("ticketCart", JSON.stringify({ ...ticketCart }));
  //   }
  // }, [ticketCart]);

  const startPurchaseFlow = async () => {
    await startPurchaseAction({
      ticketCart,
      totalPrice,
      eventID,
    });
  };

  return (
    <div className="col-span-2 h-full flex flex-col">
      <h2 className=" mt-10 text-3xl font-semibold leading-7 text-gray-900">
        Ingressos
      </h2>
      <div className=" mt-4 flex flex-col gap-4">
        {tickets.map((ticket) => (
          <TicketItem ticket={ticket} key={ticket.id} isAuth={isAuth} />
        ))}
        <>
          <p className="text-lg font-semibold">Preço Total: R$ {totalPrice}</p>
          <Button type="button" onClick={() => startPurchaseFlow()}>
            Comprar
          </Button>
        </>
      </div>
    </div>
  );
}
