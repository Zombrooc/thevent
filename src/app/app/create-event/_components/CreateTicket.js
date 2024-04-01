"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react";

import { add, addDays, format } from "date-fns";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@heroicons/react/20/solid";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";

import moment from "moment";
moment.locale("pt-br");

const formSchema = z.object({
  ticketName: z
    .string()
    .min(2, { message: "O nome do ingresso deve ter no mínimo 2 caracteres." })
    .max(50, {
      message: "O nome do ingresso deve ter no máximo 50 caracteres.",
    }),
  ticketPrice: z
    .string()
    .min(0, { message: "O preço do ingresso não pode ser negativo." }),
  ticketDescription: z
    .string()
    .min(10, {
      message: "A descrição do ingresso deve ter no mínimo 10 caracteres.",
    })
    .max(200, {
      message: "A descrição do ingresso deve ter no máximo 300 caracteres.",
    }),
  startEndingSelling: z
    .object({
      from: z.date({ message: "Data de início inválida." }),
      to: z.date({ message: "Data de término inválida." }),
    })
    .refine((data) => data.to > data.from, {
      message: "A data de término deve ser após a data de início.",
      path: ["startEndingSelling"],
    }),
});

export default function CreateTicket({ tickets, setNewTickets }) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ticketName: "",
      ticketPrice: "",
      ticketDescription: "",
      startEndingSelling: {
        from: new Date(),
        to: addDays(new Date(), 30),
      },
    },
  });

  async function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    event.preventDefault(); // Isso previne o comportamento padrão de envio do formulário

    const newTickets = tickets.concat({ ...values });
    console.log(newTickets);

    await setNewTickets(newTickets);
    form.reset();
    setDialogIsOpen(false);
  }

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger className="inline-flex items-center px-4 py-2 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <PlusIcon className="mr-2 -ml-1 h-5 w-5" aria-hidden="true" />
        Criar ingresso
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Criar ingresso</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-5">
                  <div className="mt-3 grid grid-cols-1 gap-x-3 gap-y-3 sm:grid-cols-6">
                    <FormField
                      control={form.control}
                      name="ticketName"
                      render={({ field }) => (
                        <div className="sm:col-span-3 sm:col-start-1">
                          <FormItem>
                            <FormLabel className="block text-xs font-medium leading-6 text-gray-900">
                              Nome
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Inteira"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </div>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="ticketPrice"
                      render={({ field }) => (
                        <div className="sm:col-span-3">
                          <FormItem>
                            <FormLabel className="block text-xs font-medium leading-6 text-gray-900">
                              Preço
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                                placeholder="60"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription className="text-xs leading-6 text-gray-600 muted">
                              Você recebe:
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        </div>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="ticketDescription"
                      render={({ field }) => (
                        <div className="sm:col-span-full">
                          <FormItem>
                            <FormLabel className="block text-xs font-medium leading-6 text-gray-900">
                              Descrição
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                rows={3}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                                placeholder="Openbar, VIP, Camisa, Garrafa, Pulseira, Number Plate, etc."
                                {...field}
                              />
                            </FormControl>
                            <FormDescription className="text-xs leading-6 text-gray-600">
                              Descreve sobre esse ingresso e diga o que esse
                              ingresso permite.
                            </FormDescription>

                            <FormMessage />
                          </FormItem>
                        </div>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="startEndingSelling"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-xs font-semibold leading-7 text-gray-900">
                            Início e fim das vendas
                          </FormLabel>
                          <div className="grid grid-cols-1 gap-x-3 gap-y-3 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                              <div className="mt-2">
                                <div className={cn("grid gap-2")}>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant={"outline"}
                                          className={cn(
                                            "w-[300px] justify-start text-left font-normal",
                                            !field.value &&
                                              "text-muted-foreground"
                                          )}
                                        >
                                          <CalendarIcon className="mr-2 h-4 w-4" />
                                          {field.value?.from ? (
                                            field.value.to ? (
                                              <>
                                                {moment(
                                                  field.value.from
                                                ).format("LL")}{" "}
                                                -{" "}
                                                {moment(field.value.to).format(
                                                  "LL"
                                                )}
                                              </>
                                            ) : (
                                              moment(field.value.from).format(
                                                "LL"
                                              )
                                            )
                                          ) : (
                                            <span>Escolha uma data</span>
                                          )}
                                        </Button>
                                      </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                      className="w-auto p-0"
                                      align="start"
                                    >
                                      <Calendar
                                        mode="range"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        // disabled={(date) =>
                                        //   date > new Date() ||
                                        //   date < new Date("1900-01-01")
                                        // }
                                        disabled={(date) => date < new Date()}
                                        defaultMonth={field.value?.from}
                                        numberOfMonths={2}
                                        // initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </div>
                              </div>
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-xs font-semibold leading-6 text-gray-900"
                    >
                      Cancelar
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Salvar
                  </Button>
                </div>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
