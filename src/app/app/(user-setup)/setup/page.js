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

export default function Setup() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
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
    // <form
    //   className="space-y-6"
    //   action="#"
    //   method="POST"
    //   onSubmit={form.handleSubmit((data) => console.log(data))}
    // >
    //   <div>
    //     <Label>Qual seu objetivo ao acessar o site?</Label>

    //     <Select
    //       value={selected}
    //       onChange={setSelected}
    //       renderValue={(selected) => (
    //         <div className="flex items-center justify-between w-full px-3 py-1.5 text-left bg-white rounded-md shadow-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
    //           <span className="flex items-center">
    //             <span className="ml-3 block truncate">{selected.name}</span>
    //           </span>
    //         </div>
    //       )}
    //     >
    //       <SelectItem value="organizer">
    //         Divulgar e vender ingressos do meu evento
    //       </SelectItem>
    //       <SelectItem value="competitor">
    //         Encontrar eventos para participar e competir
    //       </SelectItem>
    //     </Select>
    //   </div>

    //   <div>
    //     <div className="items-top flex space-x-2">
    //       <Checkbox id="awardsPartners" />
    //       <div className="grid gap-1.5 leading-none">
    //         <Label
    //           htmlFor="awardsPartners"
    //           className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    //         >
    //           Accept terms and conditions
    //         </Label>
    //         <p className="text-sm text-muted-foreground">
    //           You agree to our Terms of Service and Privacy Policy.
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    //   <Button
    //     type="submit"
    //     className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    //   >
    //     Continuar
    //   </Button>
    // </form>
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
