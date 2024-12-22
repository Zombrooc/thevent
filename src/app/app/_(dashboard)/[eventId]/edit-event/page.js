/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { ChevronLeft, PlusCircle, Upload } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useEffect, useState, use } from "react";
import { addDays } from "date-fns";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, useFormContext } from "react-hook-form";
import { z } from "zod";

import { Calendar } from "@/components/ui/calendar";

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

import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import moment from "moment";
import { TrashIcon } from "@radix-ui/react-icons";

import { eventSchema as FormSchema } from "@/schemas/eventSchema";
import { Skeleton } from "@/components/ui/skeleton";

import TicketExtraFields from "@/components/Ticket/TicketExtraFields";
import { getUrl } from "@/lib/getUrl";

export default function EditEvent(props) {
  const params = use(props.params);
  const [bannerImage, setBannerImage] = useState(null);
  const [eventData, setEventData] = useState(null);

  const setNewBannerImage = (bannerImage) => setBannerImage(bannerImage);

  const [tags, setTags] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let eventRes = await fetch(
        new URL(getUrl(`/api/events/${params?.eventId}`)),
        {
          next: {
            revalidate: 0,
          },
        }
      );

      const { eventData } = await eventRes.json();

      let { address, tickets } = eventData;

      tickets = await Promise.all(
        tickets.map((ticket) => {
          return {
            ...ticket,
            startEndingSelling: {
              from: ticket.startSellingAt,
              to: ticket.endSellingAt,
            },
          };
        })
      );

      setEventData({
        ...eventData,
        eventDateStartEnd: {
          from: eventData.eventDateStart,
          to: eventData.eventDateEnd,
        },
        ...address,
        tickets,
      });
    };

    getData();
  }, []);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      eventName: "",
      eventDescription: "",
      street: "",
      localName: "",
      neighborhood: "",
      number: "",
      city: "",
      state: "",
      cep: "",
      eventDateStartEnd: {
        from: addDays(new Date(), 30),
        to: addDays(new Date(), 60),
      },
      tickets: [],
      tags: [],
    },
    values: eventData,
  });
  // const { isLoaded, isSignedIn, user } = useUser();

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

    // const res = await createEventAction(
    //   bannerImage,
    //   eventData,
    //   ticketsData,
    //   tagsData,
    //   address
    // );

    // console.log(res);

    form.reset();
  }

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                {eventData?.eventName}
              </h1>
              <Badge variant="outline" className="ml-auto sm:ml-0">
                {eventData?.eventStatus.toUpperCase()}
              </Badge>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button
                  variant="outline"
                  size="sm"
                  onCLick={() => form.reset()}
                >
                  Descartar alterações
                </Button>
                <Button size="sm">Salvar</Button>
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
                            <TicketExtraFields fieldIndex={index} />
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
                      variant="ghost"
                      className="gap-1"
                      type="button"
                      onClick={() =>
                        appendTicket({
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
                      <PlusCircle className="h-3.5 w-3.5" />
                      Novo Ingresso
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Stock</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">SKU</TableHead>
                          <TableHead>Stock</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead className="w-[100px]">Size</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-semibold">
                            GGPC-001
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="stock-1" className="sr-only">
                              Stock
                            </Label>
                            <Input
                              id="stock-1"
                              type="number"
                              defaultValue="100"
                            />
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="price-1" className="sr-only">
                              Price
                            </Label>
                            <Input
                              id="price-1"
                              type="number"
                              defaultValue="99.99"
                            />
                          </TableCell>
                          <TableCell>
                            <ToggleGroup
                              type="single"
                              defaultValue="s"
                              variant="outline"
                            >
                              <ToggleGroupItem value="s">S</ToggleGroupItem>
                              <ToggleGroupItem value="m">M</ToggleGroupItem>
                              <ToggleGroupItem value="l">L</ToggleGroupItem>
                            </ToggleGroup>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-semibold">
                            GGPC-002
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="stock-2" className="sr-only">
                              Stock
                            </Label>
                            <Input
                              id="stock-2"
                              type="number"
                              defaultValue="143"
                            />
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="price-2" className="sr-only">
                              Price
                            </Label>
                            <Input
                              id="price-2"
                              type="number"
                              defaultValue="99.99"
                            />
                          </TableCell>
                          <TableCell>
                            <ToggleGroup
                              type="single"
                              defaultValue="m"
                              variant="outline"
                            >
                              <ToggleGroupItem value="s">S</ToggleGroupItem>
                              <ToggleGroupItem value="m">M</ToggleGroupItem>
                              <ToggleGroupItem value="l">L</ToggleGroupItem>
                            </ToggleGroup>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-semibold">
                            GGPC-003
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="stock-3" className="sr-only">
                              Stock
                            </Label>
                            <Input
                              id="stock-3"
                              type="number"
                              defaultValue="32"
                            />
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="price-3" className="sr-only">
                              Stock
                            </Label>
                            <Input
                              id="price-3"
                              type="number"
                              defaultValue="99.99"
                            />
                          </TableCell>
                          <TableCell>
                            <ToggleGroup
                              type="single"
                              defaultValue="s"
                              variant="outline"
                            >
                              <ToggleGroupItem value="s">S</ToggleGroupItem>
                              <ToggleGroupItem value="m">M</ToggleGroupItem>
                              <ToggleGroupItem value="l">L</ToggleGroupItem>
                            </ToggleGroup>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="justify-center border-t p-4">
                    <Button size="sm" variant="ghost" className="gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      Add Variant
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
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
                </Card>
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
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle>Banner do Evento</CardTitle>
                    {/* <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription> */}
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      {(eventData && (
                        <Image
                          alt="Banner do Evento"
                          className="aspect-square w-full rounded-md object-cover"
                          height="300"
                          src={`${eventData?.bannerImage}`}
                          width="300"
                        />
                      )) || <Skeleton className="w-full h-[70px]" />}
                      <div className="grid grid-cols-3 gap-2">
                        {/* <button>
                          <Image
                            alt="Product image"
                            className="aspect-square w-full rounded-md object-cover"
                            height="84"
                            src="/placeholder.svg"
                            width="84"
                          />
                        </button>
                        <button>
                          <Image
                            alt="Product image"
                            className="aspect-square w-full rounded-md object-cover"
                            height="84"
                            src="/placeholder.svg"
                            width="84"
                          />
                        </button> */}
                        <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                          <Upload className="h-4 w-4 text-muted-foreground" />
                          <span className="sr-only">Upload</span>
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button variant="outline" size="sm" onCLick={() => form.reset()}>
                Descartar Alterações
              </Button>
              <Button size="sm">Salvar Alterações</Button>
            </div>
          </div>
        </form>
      </Form>
    </main>
  );
}
