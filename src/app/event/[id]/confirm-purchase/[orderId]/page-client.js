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
      <main className=" max-w-5xl rounded-xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 bg-white ">
        {orderItems.map(({ ticket }, i) => (
          <Card key={ticket.id} className="mb-5">
            <CardHeader>
              <CardTitle>
                {i + 1} - {ticket.ticketName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {ticket.form.fields.map((field, index) => (
                  <Fragment key={index}>
                    {field.type === "text" && (
                      <div className="grid gap-3">
                        <Label htmlFor={field.name}>{field.name}</Label>
                        <Input
                          placeholder={field.name}
                          type="text"
                          name={field.name1}
                          required={field.required}
                          {...register(field.name)}
                        />
                      </div>
                    )}

                    {field.type === "select" && (
                      <div className="grid gap-3">
                        <Label htmlFor="name">{field.name}</Label>
                        <Select
                          {...register(field.name)}
                          required={field.required}
                          name={field.name}
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
                      </div>
                    )}
                  </Fragment>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="flex items-center justify-center gap-2">
          <Button type="submit" className="w-full">
            Confirmar Informações
          </Button>
          <Button
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
