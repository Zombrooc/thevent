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

import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormDescription,
  FormMessage,
  FormControl,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  role: z.string({
    required_error: "Selecione um objetivo.",
  }),
  awardsPartnerGroup: z.boolean().default(false).optional(),
});

import { Checkbox } from "@/components/ui/checkbox";

import { updateUserRoleAndAcceptRecievePromotions } from "./actions";
import { useSearchParams } from "next/navigation";

export default function Setup() {
  const searchParams = useSearchParams();

  const session_token = searchParams.get("session_token");

  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data) {
    try {
      await updateUserRoleAndAcceptRecievePromotions(data, session_token);
      toast({
        title: "Dados enviados com sucesso!",
        description: "Suas informações foram atualizadas.",
      });
    } catch (error) {
      toast({
        title: "Erro ao enviar os dados",
        description: "Não foi possível atualizar suas informações.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Qual seu maior objetivo na plataforma?</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="w-full"
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione seu objetivo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="organizer">
                    Divulgar e vender ingressos do meu evento
                  </SelectItem>
                  <SelectItem value="competitor">
                    Procurar eventos para participar e competir
                  </SelectItem>
                  <SelectItem value="awards-supplier">
                    Fornecer premiações para os organizadores
                  </SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="w-full"
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage email addresses in your{" "}
                <Link href="/examples/forms">email settings</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="awardsPartnerGroup"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Receber orçamentos de premiações</FormLabel>

                <FormDescription>
                  Ao criar o evento receba orçamentos de diversas empresas
                  parceiras
                </FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Continuar</Button>
      </form>
    </Form>
  );
}
