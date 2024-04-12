"use client";

import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
export default function ConfirmPurchase() {
  const ticketCart = useSelector((state) => state.ticketCart.tickets);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  const handleConfirmPurchase = async () => {
    await fetch("/api/checkout-sessions", {
      method: "POST",
      body: JSON.stringify(ticketCart),
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button> Comprar </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirme os ingressos a serem comprados</DialogTitle>
          <DialogDescription>
            Confira se todos os ingressos desejados estão corretos antes de
            concluir sua compra.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Resumo do Pedido</h3>
          <ul className="divide-y divide-gray-200">
            {Object.values(ticketCart).map((ticket) => (
              <li
                key={ticket.id}
                className="py-4 flex justify-between items-center"
              >
                <div>
                  <h4 className="text-sm font-medium">{ticket.ticketName}</h4>
                  <p className="text-sm text-gray-500">
                    Quantidade: {ticket.quantity}
                  </p>
                </div>
                <p className="text-sm font-medium">
                  R${(ticket.ticketPrice * ticket.quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
          <div className="pt-4 flex justify-between">
            <span className="text-base font-medium">Total</span>
            <span className="text-base font-medium">
              R$
              {Object.values(ticketCart)
                .reduce(
                  (total, ticket) =>
                    total + ticket.ticketPrice * ticket.quantity,
                  0
                )
                .toFixed(2)}
            </span>
          </div>
        </div>

        <Button
          type="submit"
          role="link"
          onClick={() => handleConfirmPurchase()}
        >
          Confirmar
        </Button>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
