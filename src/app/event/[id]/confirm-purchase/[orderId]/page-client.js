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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useParams, useRouter } from "next/navigation";

export default function ConfirmPurchaseClient({ orderItems }) {
  const { setValue, register, handleSubmit } = useForm();
  const { orderId } = useParams();
  const router = useRouter();

  const onSubmit = async (data) => {
    console.log("Data: ", data);
    const res = await fetch(`/api/userAnswers/`, {
      body: JSON.stringify({
        userAnswers: data,
        orderItems,
      }),
      method: "PATCH",
    });

    if (res.status === 422) {
      console.error("Missing arguments");
    }

    const { done } = await res.json();

    if (done) {
      const response = await fetch(`/api/stripe/checkout-sessions`, {
        method: "POST",
        body: JSON.stringify({ orderId }),
      });

      // if (response.status === 401 && response.statusText === "Unauthorized") {
      //   auth
      // } else {
      response
        .json()
        .then((session) => {
          router.push(session.url);
        })
        .catch((err) => {
          console.error("Erro ao obter URL de checkout", err);
        });
      // }
    }
  };

  return (
    <>
      <main className=" max-w-5xl rounded-xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 bg-white ">
        <form onSubmit={handleSubmit(onSubmit)}>
          {orderItems
            .filter(({ forms }) => (forms ? true : false))
            .map(({ id, ticketName, forms }, i) => (
              <Fragment key={id}>
                {forms && (
                  <Card key={id} className="mb-5">
                    <CardHeader>
                      <CardTitle>
                        {i + 1} - {ticketName}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        {forms.map((field, index) => (
                          <Fragment key={index}>
                            {field.type === "text" && (
                              <div className="grid gap-3">
                                <Label htmlFor={field.name}>{field.name}</Label>
                                <Input
                                  placeholder={field.name}
                                  type="text"
                                  name={field.name}
                                  required={field.required}
                                  {...register(`${id}.${field.name}`)}
                                />
                              </div>
                            )}

                            {field.type === "select" && (
                              <div className="grid gap-3">
                                <Label htmlFor="name">{field.name}</Label>
                                <Select
                                  onValueChange={(value) =>
                                    setValue(`${id}.${field.name}`, value)
                                  }
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
                )}
              </Fragment>
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
        </form>
      </main>
    </>
  );
}
