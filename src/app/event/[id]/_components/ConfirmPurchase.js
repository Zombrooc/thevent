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
import { redirect, usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function ConfirmPurchase({ params }) {
  const pathname = usePathname();
  const router = useRouter();
  const { tickets: ticketCart, totalPrice } = useSelector(
    (state) => state.ticketCart
  );

  const handleConfirmPurchase = async () => {
    const filteredTickets = await ticketCart.filter(
      (ticket) => ticket.quantity > 0
    );

    const purchaseData = {
      tickets: filteredTickets,
      totalPrice,
      event: pathname.split("/")[2],
    };

    const response = await fetch("/api/stripe/checkout-sessions", {
      method: "POST",
      body: JSON.stringify(purchaseData),
    });

    if (response.status === 401 && response.statusText === "Unauthorized") {
      router.push("/api/auth/login");
    } else {
      response
        .json()
        .then((session) => {
          router.push(session.url);
        })
        .catch((err) => {
          console.error("Erro ao obter URL de checkout", err);
        });
    }
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
          <h3 className="text-lg font-bold">Resumo do Pedido</h3>
          <ul className="divide-y divide-gray-200">
            {Object.values(ticketCart)
              .filter((ticket) => ticket.quantity > 0)
              .map((ticket) => (
                <li
                  key={ticket.id}
                  className="py-4 flex justify-between items-center"
                >
                  <div>
                    <h4 className="text-lg font-bold">{ticket.ticketName}</h4>
                    <p className="text-sm text-gray-500">
                      Quantidade: {ticket.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-medium">
                    R${(ticket.price * ticket.quantity).toFixed(2)}
                  </p>
                </li>
              ))}
          </ul>
          <div className="pt-4 flex justify-between">
            <span className="text-lg font-medium">Total</span>
            <span className="text-lg font-medium">
              R$
              {totalPrice.toFixed(2)}
            </span>
          </div>
        </div>

        <Button type="button" onClick={() => handleConfirmPurchase()}>
          Confirmar
        </Button>
      </DialogContent>
    </Dialog>
  );
}
