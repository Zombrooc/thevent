import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircledIcon } from "@radix-ui/react-icons";

export default function SuccessPage() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Card className="mx-auto max-w-2xl border-0 shadow-lg">
        <CardContent className="flex flex-col items-center gap-4 p-8">
          <CheckCircledIcon className="h-10 w-10 text-green-500" />
          <div className="text-center">
            <h1 className="font-bold text-3xl">Obrigado!</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Seu pedido foi confirmado
            </p>
          </div>
          <div className="grid gap-0.5 text-sm w-full md:grid-cols-2 md:gap-2">
            <div className="font-medium">Número do pedido</div>
            <div className="text-right">#1234</div>
          </div>
          <div className="text-left ">
            <h2 className="font-bold text-md text-left my-2">
              {" "}
              Itens do Pedido
            </h2>
            <div className="grid gap-0.5 text-sm w-full md:grid-cols-2 md:gap-2">
              <div className="font-medium">Número do pedido</div>
              <div className="text-right">#1234</div>
              <div className="font-medium">Número do pedido</div>
              <div className="text-right">#1234</div>
              <div className="font-medium">Número do pedido</div>
              <div className="text-right">#1234</div>
              <div className="font-medium">Número do pedido</div>
              <div className="text-right">#1234</div>
            </div>
          </div>
          <Separator />
          <div className="grid gap-0.5 w-full md:grid-cols-2 md:gap-2 text-lg">
            <div className="font-bold">Total</div>
            <div className="text-right font-bold">R$99.00</div>
          </div>

          <Button className="w-full"> Continuar procurando desafios </Button>
        </CardContent>
      </Card>
    </div>
  );
}
