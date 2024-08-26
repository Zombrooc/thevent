"use client";

import TicketItem from "./TicketItem";
import ConfirmPurchase from "./ConfirmPurchaseModal";
import { useSelector } from "react-redux";
// import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
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
            <p className="text-lg font-semibold">
              Preço Total: R$ {totalPrice}
            </p>
            <ConfirmPurchase />
          </>
        ) : (
          <Button asChild>
            <Link href={`/api/auth/login?returnTo=${pathname}`}>
              Faça login para comprar os ingresso
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
