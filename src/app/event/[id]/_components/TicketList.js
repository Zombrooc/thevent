"use client";

import TicketItem from "./TicketItem";
import ConfirmPurchase from "./ConfirmPurchaseModal";
import { useSelector } from "react-redux";
// import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { SignIn, SignInButton, useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function TicketList({ tickets }) {
  const pathname = usePathname();

  const { totalPrice } = useSelector((state) => state.ticketCart);

  const { user, isSignedIn } = useUser();

  console.log(user);

  // useEffect(() => {
  //   if (ticketCart !== null) {
  //     localStorage.setItem("ticketCart", JSON.stringify({ ...ticketCart }));
  //   }
  // }, [ticketCart]);

  return (
    <div className="col-span-2 h-full flex flex-col">
      <h2 className=" mt-10 text-3xl font-semibold leading-7 text-gray-900">
        Ingressos
      </h2>
      <div className=" mt-4 flex flex-col gap-4">
        {tickets.map((ticket) => (
          <TicketItem ticket={ticket} key={ticket.id} isAuth={!!user} />
        ))}

        {user && isSignedIn ? (
          <>
            <p className="text-lg font-semibold">
              Preço Total: R$ {totalPrice}
            </p>
            <ConfirmPurchase />
          </>
        ) : (
          <SignInButton forceRedirectUrl={`${pathname}`}>
            <Button>Faça login para comprar os ingresso</Button>
          </SignInButton>
        )}
      </div>
    </div>
  );
}
