"use client";

import { useForm } from "react-hook-form";

import { Label } from "@/components/ui/label";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

import { Checkbox } from "@/components/ui/checkbox";

export default function Setup() {
  const form = useForm();

  return (
    <form
      className="space-y-6"
      action="#"
      method="POST"
      onSubmit={form.handleSubmit((data) => console.log(data))}
    >
      <div>
        <Label>Qual seu objetivo ao acessar o site?</Label>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione seu objetivo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="organizer">
              Divulgar e vender ingressos do meu evento
            </SelectItem>
            <SelectItem value="competitor">
              Encontrar eventos para participar e competir
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <div className="flex items-center space-x-2">
          <Checkbox id="awardsProgram" />
          <Label
            htmlFor="awardsProgram"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Pretende participar do programa de premiações Thevent?
          </Label>
        </div>
      </div>
      <Button
        type="submit"
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Continuar
      </Button>
    </form>
  );
}
