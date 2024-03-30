"use client";

import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

import { useState } from "react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Plate, PlateContent } from "@udecode/plate-common";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Fragment } from "react";
import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon,
} from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";

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
import { toast } from "@/components/ui/use-toast";
import ImageUpload from "@/components/ImageUpload";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CreateTicket from "./_components/CreateTicket";

import moment from "moment";
import { Textarea } from "@/components/ui/textarea";

const FormSchema = z.object({
  eventName: z.string().min(1, {
    message: "O nome do evento deve ter pelo menos 1 caractere.",
  }),
  eventDescription: z
    .string()
    .min(10, {
      message: "A descrição do evento deve ter pelo menos 10 caracteres.",
    })
    .max(3000, {
      message: "A descrição do evento deve ter no máximo 3000 caracteres.",
    }),
  street: z.string().min(1, {
    message: "A rua deve ter pelo menos 1 caractere.",
  }),
  localName: z.string().min(1, {
    message: "O nome do local deve ter pelo menos 1 caractere.",
  }),
  city: z.string().min(1, {
    message: "A cidade deve ter pelo menos 1 caractere.",
  }),
  state: z.string().min(2, {
    message: "O estado deve ter pelo menos 2 caracteres.",
  }),
  postalCode: z.string().regex(/^\d{5}-\d{3}$/, {
    message: "O código postal deve estar no formato 00000-000.",
  }),
  eventDateStartEnd: z.object({
    from: z.date({
      required_error: "A data de início do evento é obrigatória.",
    }),
    to: z
      .date({
        required_error: "A data de término do evento é obrigatória.",
      })
      .refine((data) => data.end > data.start, {
        message: "A data de término deve ser após a data de início.",
      }),
  }),
});

export default function CreateEvent() {
  const [tickets, setTickets] = useState([]);
  const [bannerImage, setBannerImage] = useState(null);

  const setNewTickets = (newTickets) => setTickets(newTickets);
  const setNewBannerImage = (bannerImage) => setBannerImage(bannerImage);

  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  const [date, setDate] = useState({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  function onSubmit(data) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Criar evento
          </h2>
          <p className="mt-1 text-xs leading-6 text-gray-600">
            Preencha as informações a seguir para que possamos ver esse evento
            acontecer
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
                Essa imagem será exibida para os competidores ao procurar pelo
                seu evento. Por isso lembre-se de criar uma arte chamativa e
                contendo as principais informações do seu evento.
              </p>
            </div>
            <div className="sm:col-span-4">
              <Label
                htmlFor="eventName"
                className="block text-xs font-medium leading-6 text-gray-900"
              >
                Nome do Evento
              </Label>
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-full">
                <Input
                  type="text"
                  name="eventName"
                  id="eventName"
                  // className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-xs sm:leading-6"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                  placeholder="1º Campeonato de Xadrez de Rio Verde"
                />
              </div>
            </div>
            <div className="col-span-full">
              <Label
                htmlFor="eventDescription"
                className="block text-xs font-medium leading-6 text-gray-900"
              >
                Descrição
              </Label>
              <div>
                <Textarea
                  id="eventDescription"
                  name="eventDescription"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                  defaultValue={""}
                />
              </div>
              <p className="text-xs leading-6 text-gray-600">
                Escreve um poucos sobre o seu evento.
              </p>
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

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <Label
                htmlFor="street-address"
                className="block text-xs font-medium leading-6 text-gray-900"
              >
                Endereço
              </Label>
              <Input
                type="text"
                name="street-address"
                id="street-address"
                autoComplete="street-address"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
              />
            </div>
            <div className="col-span-full">
              <Label
                htmlFor="localName"
                className="block text-xs font-medium leading-6 text-gray-900"
              >
                Nome do local
              </Label>
              <Input
                type="text"
                name="localName"
                id="localName"
                autoComplete="localName"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
              />
            </div>
            <div className="sm:col-span-2 sm:col-start-1">
              <Label
                htmlFor="city"
                className="block text-xs font-medium leading-6 text-gray-900"
              >
                Cidade
              </Label>
              <Input
                type="text"
                name="city"
                id="city"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
              />
            </div>
            <div className="sm:col-span-2">
              <Label
                htmlFor="state"
                className="block text-xs font-medium leading-6 text-gray-900"
              >
                Estado
              </Label>
              <Input
                type="text"
                name="state"
                id="state"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
              />
            </div>
            <div className="sm:col-span-2">
              <Label
                htmlFor="zipCode"
                className="block text-xs font-medium leading-6 text-gray-900"
              >
                CEP
              </Label>
              <Input
                type="text"
                name="zipCode"
                id="zipCode"
                autoComplete="zipCode"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
              />
            </div>
            <div className="sm:col-span-2">
              <Label
                htmlFor="eventDate"
                className="block text-xs font-medium leading-6 text-gray-900"
              >
                Data do Evento
              </Label>
              <div className={cn("grid gap-2")}>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant="outline"
                      className={cn(
                        "w-[300px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, "LLL dd, y")} -{" "}
                            {format(date.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(date.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
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
            <div className="flex">
              <CreateTicket tickets={tickets} setNewTickets={setNewTickets} />
            </div>
            <div className="col-span-full ">
              {tickets &&
                tickets.map((ticket) => (
                  <div className="mt-2 lg:flex lg:items-center lg:justify-between">
                    <div className="min-w-0 flex-1">
                      <h2 className="text-md font-bold leading-7 text-gray-900 sm:truncate sm:text-xl sm:tracking-tight">
                        {ticket.ticketName}
                      </h2>
                      <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                        {/* <div className="mt-2 flex items-center text-xs text-gray-500">
                      <BriefcaseIcon
                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                    </div> */}
                        {/* <div className="mt-2 flex items-center text-xs text-gray-500">
                        <MapPinIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        
                      </div> */}
                        <div className="mt-2 flex items-center text-xs text-gray-500">
                          <CurrencyDollarIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          R${ticket.ticketPrice}
                        </div>
                        <div className="mt-2 flex items-center text-xs text-gray-500">
                          <CalendarIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          {moment(ticket.startEndingSelling.from).format(
                            "DD/MM/YYYY"
                          )}
                          -
                          {moment(ticket.startEndingSelling.to).format(
                            "DD/MM/YYYY"
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 flex lg:ml-4 lg:mt-0">
                      <span className="sm:ml-3">
                        <button
                          type="button"
                          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          <CheckIcon
                            className="-ml-0.5 mr-1.5 h-5 w-5"
                            aria-hidden="true"
                          />
                          Publish
                        </button>
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Notifications
          </h2>
          <p className="mt-1 text-xs leading-6 text-gray-600">
            Nós sempre vamos te informar sobre mudanças importantes, mas você
            escolhe sobre o que mais quer ouvir.
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
                      Get notified when someones posts a comment on a posting.
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
                      Get notified when a candidate accepts or rejects an offer.
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
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-xs font-semibold leading-6 text-gray-900"
        >
          Cencelar
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Criar evento
        </button>
      </div>
    </>
  );
}
