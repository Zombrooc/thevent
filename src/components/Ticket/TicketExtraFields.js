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
import { useEffect, useRef } from "react";

import { useFieldArray, useFormContext } from "react-hook-form";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";

import { TrashIcon } from "@radix-ui/react-icons";

function SelectInputOptions({ fieldPath }) {
  const form = useFormContext();

  const {
    fields: selectInputOptions,
    append: appendSelectInputOptions,
    remove: removeSelectInputOptions,
  } = useFieldArray({
    name: fieldPath,
    control: form.control,
  });

  return (
    <>
      {selectInputOptions.map((child, index) => (
        <FormField
          key={child.id}
          control={form.control}
          name={`${fieldPath}.${index}.option`}
          render={({ field }) => (
            <div className="sm:col-span-3 sm:col-start-1">
              <FormItem>
                <FormControl>
                  <Input
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  You can manage email addresses in your{" "}
                </FormDescription>
              </FormItem>
              <Button
                type="button"
                variant="destructive"
                className="w-10 h-10 absolute right-4 top-4 flex justify-center align-center"
                onClick={() => removeSelectInputOptions(index)}
                size="icon"
              >
                <TrashIcon className="h-6 w-6" />
              </Button>
            </div>
          )}
        />
      ))}
      <Button
        size="sm"
        variant="ghost"
        className="gap-1"
        type="button"
        onClick={() => appendSelectInputOptions({ option: "" })}
      >
        <PlusCircle />
        Adicionar opção{" "}
      </Button>
    </>
  );
}

export default function TicketExtraFields({ fieldIndex }) {
  const form = useFormContext();

  const {
    fields: extraFieldsField,
    append: appendExtraField,
    remove: removeExtraField,
  } = useFieldArray({
    name: `tickets.${fieldIndex}.extraFields`,
    control: form.control,
  });

  const cardRef = useRef(null);

  useEffect(() => {
    if (extraFieldsField.length > 0) {
      cardRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [extraFieldsField.length]);

  const watchAll = form.watch();

  useEffect(() => {
    console.log(watchAll);
  }, [watchAll]);
  return (
    <>
      <ScrollArea className="h-[500px] w-full p-4">
        {extraFieldsField.length > 0 && (
          <>
            {extraFieldsField.map((child, index, row) => (
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
                        render={({ field }) => {
                          console.log("Field: ", field);
                          return (
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
                                  <SelectItem value="text">Texto</SelectItem>
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
                                  <SelectItem value="date">Data</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                You can manage email addresses in your{" "}
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      {watchAll.tickets[fieldIndex].extraFields[index].type ===
                        "checkbox" && <span> Checkbox </span>}
                      {watchAll.tickets[fieldIndex].extraFields[index].type ===
                        "radio" && <span> Radio </span>}
                      {watchAll.tickets[fieldIndex].extraFields[index].type ===
                        "select" && (
                        <SelectInputOptions
                          fieldPath={`tickets.${fieldIndex}.extraFields.${index}.selectOptions`}
                        />
                      )}
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
          </>
        )}
        <div className="grid-cols-4 grid-rows-3">
          <Button
            size="sm"
            variant="ghost"
            className="gap-1"
            type="button"
            onClick={() =>
              appendExtraField({
                label: "Peso",
                name: "Peso",
                type: "text",

                required: false,
              })
            }
          >
            Peso
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="gap-1"
            type="button"
            onClick={() =>
              appendExtraField({
                label: "Tamanho de Roupa",
                name: "Tamanho de Roupa",
                type: "text",
                required: false,
              })
            }
          >
            Tamanho de Roupa
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="gap-1"
            type="button"
            onClick={() =>
              appendExtraField({
                label: "Categoria",
                name: "Categoria",
                type: "select",
                required: false,
              })
            }
          >
            Categoria
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="gap-1"
            type="button"
            onClick={() =>
              appendExtraField({
                label: "Modalidade",
                name: "Modalidade",
                type: "select",
                required: false,
              })
            }
          >
            Modalidade
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="gap-1"
            type="button"
            onClick={() =>
              appendExtraField({
                label: "Gênero",
                name: "Gênero",
                type: "select",
                required: false,
              })
            }
          >
            Gênero
          </Button>
        </div>
      </ScrollArea>

      {/* <Button
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
      </Button> */}
    </>
  );
}
