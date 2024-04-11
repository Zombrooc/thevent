"use client";

import { useDispatch, useSelector } from "react-redux";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";

import {
  addItem,
  removeItem,
} from "@/store/features/ticketCart/ticketCartSlice";

export default function TicketItem({ ticket }) {
  const ticketCart = useSelector((state) => state.ticketCart.tickets);
  const dispatch = useDispatch();

  return (
    <Card className=" flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{ticket.ticketName}</CardTitle>
        <CardDescription>{ticket.ticketDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <span className="font-semibold">
          R$ <span className="text-2xl"> {ticket.ticketPrice}</span>
        </span>
        <div className="flex items-center justify-center space-x-2 mt-4">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-full"
            // onClick={(ticket) =>
            //   setTicketCart((prevticketCart) => ({
            //     ...prevticketCart,
            //     [ticket.id]: {
            //       quantity: Math.max(
            //         0,
            //         (prevticketCart[ticket.id]?.quantity || 0) - 1
            //       ),
            //     },
            //   }))
            // }
            disabled={Number(ticketCart[ticket.id]?.quantity) === 0}
            onClick={() => dispatch(removeItem({ id: ticket.id }))}
          >
            <MinusIcon className="h-4 w-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <div className="flex-1 text-center">
            <div className="text-2xl font-bold tracking-tighter">
              {ticketCart[ticket.id]?.quantity || "0"}
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-full"
            // onClick={() => onClick(10)}
            // onClick={(ticket) =>
            //   setTicketCart({
            //     ...ticketCart,
            //     [ticket.id]: {
            //       quantity: (ticketCart[ticket.id]?.quantity += 1),
            //     },
            //   })
            // }
            onClick={() => dispatch(addItem({ id: ticket.id }))}
            // disabled={goal >= 400}
          >
            <PlusIcon className="h-4 w-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
