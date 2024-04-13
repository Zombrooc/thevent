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
import { createSelector } from "reselect";

import {
  addItem,
  removeItem,
} from "@/store/features/ticketCart/ticketCartSlice";

const selectTicketItem = createSelector(
  [(state) => state.ticketCart.tickets, (state, ticketId) => ticketId],
  (tickets, ticketId) => tickets.filter((ticket) => ticket.id === ticketId)
);

export default function TicketItem({ ticket }) {
  const ticketItem = useSelector((state) => selectTicketItem(state, ticket.id));

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
            disabled={Number(ticketItem[0]?.quantity) === 0}
            onClick={() => dispatch(removeItem({ id: ticket.id }))}
          >
            <MinusIcon className="h-4 w-4" />
            <span className="sr-only">Remover Ingresso</span>
          </Button>
          <div className="flex-1 text-center">
            <div className="text-2xl font-bold tracking-tighter">
              {ticketItem[0]?.quantity || "0"}
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-full"
            onClick={() =>
              dispatch(
                addItem({
                  id: ticket.id,
                  stripeID: ticket.stripeID,
                  ticketPrice: ticket.ticketPrice,
                })
              )
            }
          >
            <PlusIcon className="h-4 w-4" />
            <span className="sr-only">Adicionar Ingresso</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
