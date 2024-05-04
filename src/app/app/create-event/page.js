"use client";

import { useState } from "react";
import { addDays } from "date-fns";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  CheckIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/20/solid";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TagInput } from "@/components/Tag/tagInput";
import React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import ImageUpload from "@/components/ImageUpload";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import moment from "moment";
import { Textarea } from "@/components/ui/textarea";
import { TrashIcon } from "@radix-ui/react-icons";
import { createEventAction } from "./_actions/createEventAction";

const FormSchema = z.object({
  eventName: z.string().min(1, {
    message: "O nome do evento deve ter pelo menos 1 caractere.",
    required_error: "O nome do evento é obrigatório.",
  }),
  eventDescription: z
    .string()
    .min(10, {
      message: "A descrição do evento deve ter pelo menos 10 caracteres.",
      required_error: "A descrição do evento é obrigatória.",
    })
    .max(3000, {
      message: "A descrição do evento deve ter no máximo 3000 caracteres.",
    }),

  streetAddress: z.string().min(1, {
    message: "A rua deve ter pelo menos 1 caractere.",
    required_error: "A rua é obrigatória.",
  }),
  number: z.string().min(1, {
    message: "O número do local deve ter pelo menos 1 caractere.",
    required_error: "O número do local é obrigatório.",
  }),
  neighborhood: z.string().min(1, {
    message: "O bairro deve ter pelo menos 1 caractere.",
    required_error: "O bairro é obrigatório.",
  }),
  localName: z.string().min(1, {
    message: "O nome do local deve ter pelo menos 1 caractere.",
    required_error: "O nome do local é obrigatório.",
  }),
  city: z.string().min(1, {
    message: "A cidade deve ter pelo menos 1 caractere.",
    required_error: "A cidade é obrigatória.",
  }),
  state: z.string().min(2, {
    message: "O estado deve ter pelo menos 2 caracteres.",
    required_error: "O estado é obrigatório.",
  }),
  postalCode: z.string().regex(/^\d{5}-\d{3}$/, {
    message: "O código postal deve estar no formato 00000-000.",
    required_error: "O código postal é obrigatório.",
  }),
  eventDateStartEnd: z
    .object({
      from: z.date({ message: "Data de início inválida." }),
      to: z.date({ message: "Data de término inválida." }),
    })
    .refine((data) => data.to > data.from, {
      message: "A data de término deve ser após a data de início.",
      path: ["startEndingSelling"],
    }),

  tickets: z.array(
    z.object({
      ticketName: z
        .string()
        .min(2, {
          message: "O nome do ingresso deve ter no mínimo 2 caracteres.",
        })
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
      ticketStockAvailable: z.string().min(1, {
        message: "A quantidade de ingressos disponíveis deve ser pelo menos 1.",
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
    })
  ),
  tags: z
    .array(
      z.object({
        id: z.string().min(1, "O ID da tag é obrigatório."),
        text: z.string().min(1, "O texto da tag é obrigatório."),
      })
    )
    .min(1, "Pelo menos uma tag é necessária."),
});

// import { useUser } from "@auth0/nextjs-auth0/client";
// import { useUser } from "@clerk/nextjs";

export default function CreateEvent() {
  const [bannerImage, setBannerImage] = useState(null);

  const setNewBannerImage = (bannerImage) => setBannerImage(bannerImage);

  const [tags, setTags] = useState([]);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      eventName: "",
      eventDescription: "",
      streetAddress: "",
      localName: "",
      neighborhood: "",
      number: "",
      city: "",
      state: "",
      postalCode: "",
      eventDateStartEnd: {
        from: addDays(new Date(), 30),
        to: addDays(new Date(), 60),
      },
      tickets: [],
      tags: [],
    },
  });
  // const { isLoaded, isSignedIn, user } = useUser();

  const { setValue } = form;

  const { fields, append, remove } = useFieldArray({
    name: "tickets",
    control: form.control,
  });

  async function onSubmit(data) {
    const eventData = {
      eventName: data.eventName,
      eventDescription: data.eventDescription,

      eventDateStartEnd: data.eventDateStartEnd,
    };

    const address = {
      street: data.streetAddress,
      localName: data.localName,
      neighborhood: data.neighborhood,
      number: Number(data.number),
      city: data.city,
      state: data.state,
      cep: data.postalCode,
    };

    const ticketsData = data.tickets;

    const tagsData = data.tags.map((tag) => {
      return {
        tag: tag.text,
      };
    });

    console.log(eventData, ticketsData, tagsData, address);

    const res = await createEventAction(
      bannerImage,
      eventData,
      ticketsData,
      tagsData,
      address
    );

    console.log(res);

    form.reset();
  }

  // if (!isLoaded || !isSignedIn) {
  //   return null;
  // }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Criar evento
              </h2>
              <p className="mt-1 text-xs leading-6 text-gray-600">
                Preencha as informações a seguir para que possamos ver esse
                evento acontecer
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <Label
                    htmlFor="cover-photo"
                    className="block text-xs font-medium leading-6 text-gray-900"
                  >
                    Imagem do cartaz ou banner do evento
                  </Label>
                  <ImageUpload
                    imageUrl={bannerImage}
                    setNewImageURL={setNewBannerImage}
                  />
                  <p className="mt-3 text-xs leading-6 text-gray-600">
                    Essa imagem será exibida para os competidores ao procurar
                    pelo seu evento. Por isso lembre-se de criar uma arte
                    chamativa e contendo as principais informações do seu
                    evento.
                  </p>
                </div>
                <div className="sm:col-span-full">
                  <FormField
                    control={form.control}
                    name="eventName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-xs font-medium leading-6 text-gray-900">
                          Nome do Evento
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                            placeholder="1º Campeonato de Xadrez de Rio Verde"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-full"></div>
                </div>
                <div className="col-span-full">
                  <FormField
                    control={form.control}
                    name="eventDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-xs font-medium leading-6 text-gray-900">
                          Descrição
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            rows={3}
                            {...field}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                          />
                        </FormControl>
                        <FormDescription className="text-xs leading-6 text-gray-600">
                          Escreve um poucos sobre o seu evento.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Local e Data
              </h2>
              <p className="mt-1 text-xs leading-6 text-gray-600">
                Diga pra gente qual será o local e data do seu evento
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-3 gap-y-3 sm:grid-cols-6">
                <div className="col-span-full">
                  <FormField
                    control={form.control}
                    name="localName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-xs font-medium leading-6 text-gray-900">
                          Nome do local
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-5">
                  <FormField
                    control={form.control}
                    name="streetAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-xs font-medium leading-6 text-gray-900">
                          Endereço
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-xs font-medium leading-6 text-gray-900">
                          Número
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-2">
                  <FormField
                    control={form.control}
                    name="neighborhood"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-xs font-medium leading-6 text-gray-900">
                          Bairro
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-3">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-xs font-medium leading-6 text-gray-900">
                          Cidade
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* <div className="sm:col-span-2 sm:col-start-1"></div> */}
                <div className="sm:col-span-1">
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-xs font-medium leading-6 text-gray-900">
                          Estado
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="sm:col-span-2">
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-xs font-medium leading-6 text-gray-900">
                          CEP
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="sm:col-span-full">
                  <FormField
                    control={form.control}
                    name="eventDateStartEnd"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-xs font-semibold leading-7 text-gray-900">
                          Data de Início e Fim do Evento
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
                                              {moment(field.value.from).format(
                                                "LL"
                                              )}{" "}
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
                                      disabled={(date) => date < new Date()}
                                      defaultMonth={field.value?.from}
                                      numberOfMonths={2}
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </div>
                            </div>
                          </div>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Criar ingressos
              </h2>
              <p className="mt-1 text-xs leading-6 text-gray-600">
                Diga pra gente qual será o local e data do seu evento
              </p>

              <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8">
                <Button
                  type="button"
                  onClick={() =>
                    append({
                      ticketName: "",
                      ticketPrice: "",
                      ticketDescription: "",
                      ticketStockAvailable: "",
                      startEndingSelling: {
                        from: new Date(),
                        to: addDays(new Date(), 30),
                      },
                    })
                  }
                >
                  Novo Ingresso
                </Button>
                <div className="flex flex-col">
                  {/* <CreateTicket
                    tickets={tickets}
                    setNewTickets={setNewTickets}
                  /> */}
                  <div className="space-y-4">
                    {fields.map((_, index) => (
                      <div
                        className="relative border border-gray-900/10 p-4 rounded"
                        key={index}
                      >
                        <div className="grid grid-cols-1 gap-x-3 gap-y-3 sm:grid-cols-6">
                          <FormField
                            control={form.control}
                            name={`tickets.${index}.ticketName`}
                            render={({ field }) => (
                              <div className="sm:col-span-2 sm:col-start-1">
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
                            name={`tickets.${index}.ticketPrice`}
                            render={({ field }) => (
                              <div className="sm:col-span-2">
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
                            name={`tickets.${index}.ticketStockAvailable`}
                            render={({ field }) => (
                              <div className="sm:col-span-2">
                                <FormItem>
                                  <FormLabel className="block text-xs font-medium leading-6 text-gray-900">
                                    Quantidade liberada de ingressos
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                                      placeholder="300"
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
                            name={`tickets.${index}.ticketDescription`}
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
                                    Descreve sobre esse ingresso e diga o que
                                    esse ingresso permite.
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
                            name={`tickets.${index}.startEndingSelling`}
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
                                                      {moment(
                                                        field.value.to
                                                      ).format("LL")}
                                                    </>
                                                  ) : (
                                                    moment(
                                                      field.value.from
                                                    ).format("LL")
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
                                              disabled={(date) =>
                                                date < new Date()
                                              }
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
                        <Button
                          type="button"
                          variant="destructive"
                          className="w-10 h-10 absolute -right-4 -top-4 flex justify-center align-center"
                          onClick={() => remove(index)}
                          size="icon"
                        >
                          <TrashIcon className="h-6 w-6" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start">
                    <FormLabel className="text-xs font-semibold leading-7 text-gray-900">
                      Tags
                    </FormLabel>
                    <FormControl>
                      <TagInput
                        {...field}
                        placeholder="Corrida, Tênis, Muay Thai, Beach Tennis, ..."
                        tags={tags}
                        className="sm:min-w-[450px]"
                        setTags={(newTags) => {
                          setTags(newTags);
                          setValue("tags", newTags);
                        }}
                        maxTags={5}
                        minTags={1}
                        showCount
                        truncate={6}
                        clearAll
                        onClearAll={() => {
                          setTags([]);
                        }}
                        // enableAutocomplete
                        // autocompleteOptions={autoCompleteOptions}
                      />
                    </FormControl>
                    <FormDescription>
                      Adicione tags que representem o seu evento para facilitar
                      a busca por parte dos usuários. Separe cada tag por
                      espaço. As tags funcionam como palavras-chave, tais como
                      &quot;Corrida&quot;, &quot;BeachTennis&quot;,
                      &quot;Trilhão&quot;, etc., que ajudam a categorizar o
                      evento e torná-lo mais acessível a quem procura atividades
                      específicas. A escolha correta das tags é essencial para
                      aumentar a visibilidade do seu evento.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Notifications
              </h2>
              <p className="mt-1 text-xs leading-6 text-gray-600">
                Nós sempre vamos te informar sobre mudanças importantes, mas
                você escolhe sobre o que mais quer ouvir.
              </p>

              <div className="mt-10 space-y-10">
                <fieldset>
                  <legend className="text-xs font-semibold leading-6 text-gray-900">
                    By Email
                  </legend>
                  <div className="mt-6 space-y-6">
                    <div className="relative flex gap-x-3">
                      <div className="flex items-center">
                        <Checkbox
                          id="comments"
                          name="comments"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-xs leading-6">
                        <Label
                          htmlFor="comments"
                          className="font-medium text-gray-900"
                        >
                          Comments
                        </Label>
                        <p className="text-gray-500">
                          Get notified when someones posts a comment on a
                          posting.
                        </p>
                      </div>
                    </div>
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <Checkbox
                          id="candidates"
                          name="candidates"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-xs leading-6">
                        <Label
                          htmlFor="candidates"
                          className="font-medium text-gray-900"
                        >
                          Candidates
                        </Label>
                        <p className="text-gray-500">
                          Get notified when a candidate applies for a job.
                        </p>
                      </div>
                    </div>
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <Checkbox
                          id="offers"
                          name="offers"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-xs leading-6">
                        <Label
                          htmlFor="offers"
                          className="font-medium text-gray-900"
                        >
                          Offers
                        </Label>
                        <p className="text-gray-500">
                          Get notified when a candidate accepts or rejects an
                          offer.
                        </p>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="text-xs font-semibold leading-6 text-gray-900">
                    Push Notifications
                  </legend>
                  <p className="mt-1 text-xs leading-6 text-gray-600">
                    These are delivered via SMS to your mobile phone.
                  </p>
                  <div className="mt-6 space-y-6">
                    <RadioGroup defaultValue="push-everything">
                      <div className="flex items-center gap-x-3">
                        <RadioGroupItem
                          id="push-everything"
                          name="push-notifications"
                          value="push-everything"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />

                        <Label
                          htmlFor="push-everything"
                          className="block text-xs font-medium leading-6 text-gray-900"
                        >
                          Everything
                        </Label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <RadioGroupItem
                          id="push-email"
                          name="push-notifications"
                          value="push-email"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <Label
                          htmlFor="push-email"
                          className="block text-xs font-medium leading-6 text-gray-900"
                        >
                          Same as email
                        </Label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <RadioGroupItem
                          id="push-nothing"
                          name="push-notifications"
                          value="push-nothing"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <Label
                          htmlFor="push-nothing"
                          className="block text-xs font-medium leading-6 text-gray-900"
                        >
                          No push notifications
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </fieldset>
              </div>
            </div> */}
          </div>

          <div className="mt-6 flex flex-col items-center justify-end gap-x-6">
            <Button type="submit" className="w-full">
              Criar evento
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
      </Form>
    </>
  );
}
