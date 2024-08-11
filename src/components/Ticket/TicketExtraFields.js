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
import { useEffect, useRef, useState } from "react";
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
import { ScrollArea } from "@/components/ui/scroll-area";
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

export default function TicketExtraFields({ fieldIndex }) {
  const form = useFormContext();

  const {
    fields,
    append: appendExtraField,
    remove: removeExtraField,
  } = useFieldArray({
    name: `tickets.${fieldIndex}.extraFields`,
    control: form.control,
  });

  const cardRef = useRef(null);

  useEffect(() => {
    if (fields.length > 0) {
      cardRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [fields.length]);

  return (
    <>
      {fields.length > 0 && (
        <ScrollArea className="h-[500px] w-full p-4">
          {fields.map((child, index, row) => (
            <Card
              key={child.id}
              className="mb-4 relative"
              ref={index + 1 === row.length ? cardRef : null}
            >
              <CardHeader>
                <CardTitle>Campo {index + 1}</CardTitle>
                {/* <CardDescription>
              Diga pra gente qual será o local e data do seu evento
            </CardDescription> */}
              </CardHeader>
              <CardContent>
                <div className="space-y-4 relative">
                  <div className="grid grid-cols-1 gap-x-3 gap-y-3 sm:grid-cols-6">
                    <FormField
                      control={form.control}
                      name={`tickets.${fieldIndex}.extraFields.${index}.name`}
                      render={({ field }) => (
                        <div className="sm:col-span-full sm:col-start-1">
                          <FormItem>
                            <FormLabel className="block text-xs font-medium leading-6 text-gray-900">
                              Nome do campo
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
                      name={`tickets.${fieldIndex}.extraFields.${index}.label`}
                      render={({ field }) => (
                        <div className="sm:col-span-3 sm:col-start-1">
                          <FormItem>
                            <FormLabel className="block text-xs font-medium leading-6 text-gray-900">
                              Etiqueta do Campo
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Inteira"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                            <FormDescription>
                              You can manage email addresses in your{" "}
                            </FormDescription>
                          </FormItem>
                        </div>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`tickets.${fieldIndex}.extraFields.${index}.type`}
                      render={({ field }) => (
                        <FormItem className="col-span full sm:col-span-3">
                          <FormLabel className="block text-xs font-medium leading-6 text-gray-900">
                            Tipo
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="w-full"
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o tipo de campo." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="string">Texto</SelectItem>
                              <SelectItem value="number">Número</SelectItem>
                              <SelectItem value="select">
                                Lista Suspensa
                              </SelectItem>
                              <SelectItem value="radio">
                                Múltipla escolha
                              </SelectItem>
                              <SelectItem value="checkbox">
                                Caixa de seleção
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            You can manage email addresses in your{" "}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
              <Button
                type="button"
                variant="destructive"
                className="w-10 h-10 absolute right-4 top-4 flex justify-center align-center"
                onClick={() => removeExtraField(index)}
                size="icon"
              >
                <TrashIcon className="h-6 w-6" />
              </Button>
            </Card>
          ))}
        </ScrollArea>
      )}
      <Button
        size="sm"
        variant="ghost"
        className="gap-1"
        type="button"
        onClick={() =>
          appendExtraField({
            label: "",
            name: "",
            type: "",
            required: true,
          })
        }
      >
        <PlusCircle />
        Adicionar Campos Extras{" "}
      </Button>
    </>
  );
}
