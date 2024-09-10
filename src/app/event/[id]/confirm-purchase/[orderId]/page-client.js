"use client";

import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft } from "lucide-react";

export default function ConfirmPurchaseClient({ totalPrice, orderItems }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="max-w-5xl rounded-xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 bg-white ">
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Resumo do Pedido</h3>
          <ul className="divide-y divide-gray-200">
            {orderItems.map(({ ticket }) => (
              <li
                key={ticket.id}
                className="py-4 flex justify-between items-center"
              >
                <div>
                  <h4 className="text-lg font-bold">{ticket.ticketName}</h4>
                  <p className="text-sm text-gray-500">
                    Quantidade: {ticket.quantity}
                  </p>
                  {[...Array(ticket.quantity)].map((e, i) => (
                    <Fragment key={i}>
                      <h4 className="text-lg font-bold">
                        {ticket.ticketName} - {i + 1}
                      </h4>
                      {ticket.form.fields.map((field, index) => (
                        <Fragment key={index}>
                          {field.type === "text" && (
                            <p key={field.name}>
                              {field.name}
                              <Input
                                placeholder={field.name}
                                type="text"
                                required={field.required}
                                {...register(field.name)}
                              />
                            </p>
                          )}

                          {field.type === "select" && (
                            <Select
                              {...register(field.name)}
                              required={field.required}
                            >
                              <SelectTrigger className="w-[280px]">
                                <SelectValue
                                  placeholder={`Escolha um ${field.name}`}
                                />
                              </SelectTrigger>
                              <SelectContent>
                                {field.options.map(({ text, id }) => (
                                  <SelectItem value={text} key={id}>
                                    {text}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        </Fragment>
                      ))}
                    </Fragment>
                  ))}
                </div>
                <p className="text-sm font-medium">
                  R${ticket.ticketPrice.toFixed(2)}
                </p>
                <br />
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
      </div>

      <main className=" max-w-5xl rounded-xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 bg-white ">
        {orderItems.map(({ ticket }, i) => (
          <Card key={ticket.id}>
            <CardHeader>
              <CardTitle>
                {i + 1} - {ticket.ticketName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    className="w-full"
                    defaultValue="Gamer Gear Pro Controller"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                    className="min-h-32"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="flex items-center justify-center gap-2">
          <Button type="submit" className="w-full" size="sm">
            Confirmar Informações
          </Button>
          <Button
            size="sm"
            type="button"
            variant="ghost"
            className="mt-3 w-full text-xs font-semibold leading-6 text-gray-900"
          >
            Cancelar
          </Button>
        </div>
      </main>
    </>
  );
}
