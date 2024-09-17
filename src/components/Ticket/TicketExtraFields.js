"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useRef, useState } from "react";

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

import { TrashIcon } from "@radix-ui/react-icons";
import { TagInput } from "emblor";

function InputOptions({ fieldPath, initialData }) {
  const form = useFormContext();
  const [tags, setTags] = useState([]);
  const [activeTagIndex, setActiveTagIndex] = useState(null);

  const { setValue } = form;

  useEffect(() => {
    if (initialData) {
      setTags(initialData);
      setValue(fieldPath, initialData);
    }
  }, []);

  return (
    <>
      <FormField
        control={form.control}
        name={fieldPath}
        render={({ field }) => (
          <>
            <FormItem className="flex flex-col items-start col-span-full">
              <FormLabel className="block text-xs font-medium leading-6 text-gray-900">
                Opções
              </FormLabel>
              <FormControl className="w-full">
                <TagInput
                  {...field}
                  placeholder="Opções"
                  tags={tags}
                  className="w-full "
                  setTags={(newTags) => {
                    setTags(newTags);
                    setValue(fieldPath, newTags);
                  }}
                  activeTagIndex={activeTagIndex}
                  setActiveTagIndex={setActiveTagIndex}
                  animation="fadeIn"
                />
              </FormControl>
              <FormDescription className="text-left">
                Digite a opção e utilize a virgula (,) para separa-los.
              </FormDescription>
              <FormMessage />
            </FormItem>
          </>
        )}
      />
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
                  <CardTitle>
                    {" "}
                    {(watchAll.tickets[fieldIndex].extraFields[index].name ??=
                      `Campo ${index + 1}`) ||
                      (watchAll.tickets[fieldIndex].extraFields[index].name ===
                        "" &&
                        `Campo ${index + 1}`)}
                  </CardTitle>
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
                          <div className="sm:col-span-3 sm:col-start-1">
                            <FormItem>
                              <FormLabel className="block text-xs font-medium leading-6 text-gray-900">
                                Nome do Campo
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
                        name={`tickets.${fieldIndex}.extraFields.${index}.type`}
                        render={({ field }) => {
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

                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      {watchAll.tickets[fieldIndex].extraFields[index].type ===
                        "checkbox" && (
                        <InputOptions
                          fieldPath={`tickets.${fieldIndex}.extraFields.${index}.options`}
                          initialData={
                            watchAll.tickets[fieldIndex].extraFields[index]
                              .options
                          }
                        />
                      )}
                      {watchAll.tickets[fieldIndex].extraFields[index].type ===
                        "radio" && (
                        <InputOptions
                          fieldPath={`tickets.${fieldIndex}.extraFields.${index}.options`}
                          initialData={
                            watchAll.tickets[fieldIndex].extraFields[index]
                              .options
                          }
                        />
                      )}
                      {watchAll.tickets[fieldIndex].extraFields[index].type ===
                        "select" && (
                        <InputOptions
                          fieldPath={`tickets.${fieldIndex}.extraFields.${index}.options`}
                          initialData={
                            watchAll.tickets[fieldIndex].extraFields[index]
                              .options
                          }
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

        <div className="mt-5">
          <span className="text-md font-semibold leading-5 text-gray-900">
            Escolha um campo predefinido ou crie um campo personalizado
          </span>
          <div className="mt-4">
            <Button
              variant="outline"
              className="mr-4"
              type="button"
              onClick={() =>
                appendExtraField({
                  name: "Peso",
                  type: "text",
                  required: false,
                })
              }
            >
              Peso
            </Button>
            <Button
              variant="outline"
              className="mr-4"
              type="button"
              onClick={() =>
                appendExtraField({
                  name: "Tamanho de Roupa",
                  type: "text",
                  required: false,
                })
              }
            >
              Tamanho de Roupa
            </Button>
            <Button
              variant="outline"
              className="mr-4"
              type="button"
              onClick={() =>
                appendExtraField({
                  name: "Categoria",
                  type: "select",
                  required: false,
                })
              }
            >
              Categoria
            </Button>
            <Button
              variant="outline"
              className="mr-4"
              type="button"
              onClick={() =>
                appendExtraField({
                  name: "Modalidade",
                  type: "select",
                  required: false,
                })
              }
            >
              Modalidade
            </Button>
            <Button
              variant="outline"
              className="mr-4"
              type="button"
              onClick={() =>
                appendExtraField({
                  name: "Gênero",
                  type: "select",
                  required: false,
                  options: [
                    { id: "11", text: "Feminino" },
                    { id: "12", text: "Masculino" },
                    { id: "13", text: "Outro" },
                  ],
                })
              }
            >
              Gênero
            </Button>
            <Button
              variant="outline"
              className="mr-4"
              type="button"
              onClick={() =>
                appendExtraField({
                  name: "Time",
                  type: "text",
                  required: false,
                })
              }
            >
              Time
            </Button>
          </div>
        </div>
      </ScrollArea>

      {/* <Button
        
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
