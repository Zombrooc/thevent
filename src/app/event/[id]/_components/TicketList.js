"use client";

import TicketItem from "./TicketItem";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { insertIntoCookies } from "../_actions/handleCookies";

export default function TicketList({ tickets }) {
  const router = useRouter();

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

  // const handlePurchase = async () => {
  //   if (!isAuth) {
  //     redirectToSignIn({
  //       signInForceRedirectUrl: `${eventID}/resume-purchase`,
  //       signUpForceRedirectUrl: `${eventID}/resume-purchase`,
  //     });

  //     return;
  //   }

  //   await startPurchaseAction({
  //     ticketCart,
  //     totalPrice,
  //     eventID,
  //   });
  // };

  const handlePurchase = async () => {
    await insertIntoCookies("ticketCart", { ticketCart, totalPrice });

    router.push(`${eventID}/resume-purchase`);
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
        <>
          <p className="text-lg font-semibold">Preço Total: R$ {totalPrice}</p>
          <Button type="button" onClick={() => handlePurchase()}>
            Comprar
          </Button>
        </>
      </div>
    </div>
  );
}
