"use client";

import { useEffect, useState } from "react";
import { addDays } from "date-fns";
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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { TagInput } from "@/components/Tag/tagInput";
import React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ImageUpload from "@/components/ImageUpload";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import moment from "moment";
import { Textarea } from "@/components/ui/textarea";
import { TrashIcon } from "@radix-ui/react-icons";
import { createEventAction } from "./_actions/createEventAction";
import { eventSchema as FormSchema } from "@/schemas/eventSchema";
import TicketExtraFields from "@/components/Ticket/TicketExtraFields";
import { PlusCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function CreateEventClient() {
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

  const watchExtraFieldType = form.watch("tickets");

  useEffect(() => {
    console.log(watchExtraFieldType);
  }, [watchExtraFieldType]);

  const { setValue } = form;

  const {
    fields,
    append: appendTicket,
    remove: removeTicket,
  } = useFieldArray({
    name: "tickets",
    control: form.control,
  });

  async function onSubmit(data) {
    console.log("Criando...");
    const eventData = {
      eventName: data.eventName,
      eventDescription: data.eventDescription,
      eventDateStartEnd: data.eventDateStartEnd,
    };

    const address = {
      street: data.street,
      localName: data.localName,
      neighborhood: data.neighborhood,
      number: Number(data.number),
      city: data.city,
      state: data.state,
      cep: data.cep,
    };

    const ticketsData = data.tickets;

    const tagsData = data.tags.map((tag) => {
      return {
        tag: tag.text,
      };
    });

    await createEventAction(
      bannerImage,
      eventData,
      ticketsData,
      tagsData,
      address
    );

    form.reset();
  }

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
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Detalhes do Evento</CardTitle>
                    {/* <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription> */}
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        {/* <Label htmlFor="name">Nome do Evento</Label>
                    <Input
                      id="name"
                      type="text"
                      className="w-full"
                      defaultValue="Gamer Gear Pro Controller"
                    /> */}
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
                      </div>
                      <div className="grid gap-3">
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
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Local e Data</CardTitle>
                    <CardDescription>
                      Diga pra gente qual será o local e data do seu evento
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-x-3 gap-y-3 sm:grid-cols-6">
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
                          name="street"
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
                                  type="number"
                                  min="1"
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
                          name="cep"
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
                                            disabled={(date) =>
                                              date < new Date()
                                            }
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
                  </CardContent>
                  {/* <CardFooter className="justify-center border-t p-4">
                    <Button size="sm" variant="ghost" className="gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      Add Variant
                    </Button>
                  </CardFooter> */}
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Ingressos</CardTitle>
                  </CardHeader>
                  <CardContent>
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
                                          min="1"
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
                                          min="1"
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
                                        Descreve sobre esse ingresso e diga o
                                        que esse ingresso permite.
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
                                                      <span>
                                                        Escolha uma data
                                                      </span>
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
                                                  defaultMonth={
                                                    field.value?.from
                                                  }
                                                  numberOfMonths={2}
                                                  initialFocus
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
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="mt-4 gap-1 "
                                  type="button"
                                >
                                  <PlusCircle />
                                  Adicionar Campos Extras
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[850px]">
                                <DialogHeader>
                                  <DialogTitle>Campos extras</DialogTitle>
                                  <DialogDescription>
                                    Colete informações extras dos
                                    participamentes do seu evento. Como
                                    categorias, pesos, idades e afins. Escolha o
                                    tipo de campo que quer criar, dê um nome e
                                    diga se ele é obrigatório ou não.
                                  </DialogDescription>
                                </DialogHeader>
                                <Separator className="my-4" />
                                <TicketExtraFields fieldIndex={index} />
                                <DialogFooter className="sm:justify-center w-full ">
                                  <DialogClose>
                                    <Button
                                      type="button"
                                      className="hover:bg-primary hover:text-white w-full"
                                    >
                                      Concluir
                                    </Button>
                                  </DialogClose>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>

                            <Button
                              type="button"
                              variant="destructive"
                              className="w-10 h-10 absolute -right-4 -top-4 flex justify-center align-center"
                              onClick={() => removeTicket(index)}
                              size="icon"
                            >
                              <TrashIcon className="h-6 w-6" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-center border-t p-4">
                    <Button
                      size="sm"
                      className="gap-1"
                      type="button"
                      onClick={() =>
                        appendTicket({
                          ticketName: "",
                          // ticketPrice: null,
                          ticketDescription: "",
                          // ticketStockAvailable: null,
                          startEndingSelling: {
                            from: new Date(),
                            to: addDays(new Date(), 30),
                          },
                        })
                      }
                    >
                      <PlusCircle className="h-3.5 w-3.5" />
                      Novo Ingresso
                    </Button>
                  </CardFooter>
                </Card>

                {/* <Card>
                  <CardHeader>
                    <CardTitle>Categoria do Evento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 sm:grid-cols-3">
                      <div className="grid gap-3">
                        <Label htmlFor="category">Category</Label>
                        <Select>
                          <SelectTrigger
                            id="category"
                            aria-label="Select category"
                          >
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="clothing">Clothing</SelectItem>
                            <SelectItem value="electronics">
                              Electronics
                            </SelectItem>
                            <SelectItem value="accessories">
                              Accessories
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="subcategory">
                          Subcategory (optional)
                        </Label>
                        <Select>
                          <SelectTrigger
                            id="subcategory"
                            aria-label="Select subcategory"
                          >
                            <SelectValue placeholder="Select subcategory" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="t-shirts">T-Shirts</SelectItem>
                            <SelectItem value="hoodies">Hoodies</SelectItem>
                            <SelectItem value="sweatshirts">
                              Sweatshirts
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card> */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="tags"
                      render={({ field }) => (
                        <FormItem className="flex flex-col items-start">
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
                            Adicione tags que representem o seu evento para
                            facilitar a busca por parte dos usuários. Separe
                            cada tag por espaço. As tags funcionam como
                            palavras-chave, tais como &quot;Corrida&quot;,
                            &quot;BeachTennis&quot;, &quot;Trilhão&quot;, etc.,
                            que ajudam a categorizar o evento e torná-lo mais
                            acessível a quem procura atividades específicas. A
                            escolha correta das tags é essencial para aumentar a
                            visibilidade do seu evento.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                {/* <Card>
                  <CardHeader>
                    <CardTitle>Product Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="status">Status</Label>
                        <Select>
                          <SelectTrigger id="status" aria-label="Select status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Active</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card> */}

                {/* <Card>
                  <CardHeader>
                    <CardTitle>Archive Product</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div></div>
                    <Button size="sm" variant="secondary">
                      Arquivar Evento
                    </Button>
                  </CardContent>
                </Card> */}
              </div>
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
