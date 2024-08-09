"use client";

import TicketItem from "./TicketItem";
// import ConfirmPurchase from "./ConfirmPurchase";
import { useSelector } from "react-redux";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";

export default function TicketList({ tickets }) {
  const pathname = usePathname();

  const { totalPrice } = useSelector((state) => state.ticketCart);

  const user = useUser();

  return (
    <div className="col-span-2 h-full flex flex-col">
      <h2 className=" mt-10 text-3xl font-semibold leading-7 text-gray-900">
        Ingressos
      </h2>
      <div className=" mt-4 flex flex-col gap-4">
        {tickets.map((ticket) => (
          <TicketItem ticket={ticket} key={ticket.id} isAuth={!!user} />
        ))}

        {user ? (
          <>
            <p className="text-lg font-semibold">Total: R$ {totalPrice}</p>
            {/* <ConfirmPurchase /> */}
            {totalPrice > 0 && (
              <Button type="button" asChild>
                <Link href={`${pathname}/confirm-purchase`}>Comprar agora</Link>
              </Button>
            )}
          </>
        ) : (
          <Button asChild>
            <Link
              href={{
                pathname: "/api/auth/login",
                query: { returnTo: pathname },
              }}
            >
              Faça login para poder comprar seus ingressos
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
