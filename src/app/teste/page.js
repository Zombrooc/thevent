// "use client";

// import { useState } from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// const inputType = [
//   "text",
//   "number",
//   "select",
//   "checkbox",
//   "select",
//   "radio",
//   "date",
// ];

// const eventSchema = z.object({
//   eventName: z.string().min(1, {
//     message: "O nome do evento deve ter pelo menos 1 caractere.",
//     required_error: "O nome do evento é obrigatório.",
//   }),
//   eventDescription: z
//     .string()
//     .min(10, {
//       message: "A descrição do evento deve ter pelo menos 10 caracteres.",
//       required_error: "A descrição do evento é obrigatória.",
//     })
//     .max(3000, {
//       message: "A descrição do evento deve ter no máximo 3000 caracteres.",
//     }),

//   street: z.string().min(1, {
//     message: "A rua deve ter pelo menos 1 caractere.",
//     required_error: "A rua é obrigatória.",
//   }),
//   number: z.coerce.number(),
//   neighborhood: z.string().min(1, {
//     message: "O bairro deve ter pelo menos 1 caractere.",
//     required_error: "O bairro é obrigatório.",
//   }),
//   localName: z.string().min(1, {
//     message: "O nome do local deve ter pelo menos 1 caractere.",
//     required_error: "O nome do local é obrigatório.",
//   }),
//   city: z.string().min(1, {
//     message: "A cidade deve ter pelo menos 1 caractere.",
//     required_error: "A cidade é obrigatória.",
//   }),
//   state: z.string().min(2, {
//     message: "O estado deve ter pelo menos 2 caracteres.",
//     required_error: "O estado é obrigatório.",
//   }),
//   cep: z.string().regex(/^\d{5}-\d{3}$/, {
//     message: "O código postal deve estar no formato 00000-000.",
//     required_error: "O código postal é obrigatório.",
//   }),
//   eventDateStartEnd: z
//     .object({
//       from: z.date({ required_error: "Data de início é obrigatória." }),
//       to: z.date({ required_error: "Data de término é obrigatória." }),
//     })
//     .refine((data) => data.to > data.from, {
//       message: "A data de término deve ser após a data de início.",
//       path: ["eventDateStartEnd"],
//     }),

//   tickets: z.array(
//     z.object({
//       ticketName: z
//         .string()
//         .min(2, {
//           message: "O nome do ingresso deve ter no mínimo 2 caracteres.",
//         })
//         .max(50, {
//           message: "O nome do ingresso deve ter no máximo 50 caracteres.",
//         }),
//       ticketPrice: z.coerce
//         .number()
//         .nonnegative()
//         .min(0, { message: "O preço do ingresso não pode ser negativo." }),
//       ticketDescription: z
//         .string()
//         .min(10, {
//           message: "A descrição do ingresso deve ter no mínimo 10 caracteres.",
//         })
//         .max(200, {
//           message: "A descrição do ingresso deve ter no máximo 300 caracteres.",
//         }),
//       ticketStockAvailable: z.coerce.number().positive().int().min(1, {
//         message: "A quantidade de ingressos disponíveis deve ser pelo menos 1.",
//       }),
//       startEndingSelling: z
//         .object({
//           from: z.date({
//             required_error: "Data de início de venda é obrigatória.",
//           }),
//           to: z.date({
//             required_error: "Data de término de venda é obrigatória.",
//           }),
//         })
//         .refine((data) => data.to > data.from, {
//           message: "A data de término deve ser após a data de início.",
//           path: ["startEndingSelling"],
//         }),
//       extraFields: z
//         .array(
//           z.object({
//             name: z
//               .string()
//               .min(1, "O nome do campo personalizado é obrigatório."),
//             type: z.enum(inputType, {
//               required_error: "por favor escolha o tipo do campo",
//             }),
//             required: z.boolean(),
//             options: z
//               .array(
//                 z.object({
//                   id: z.string(),
//                   text: z.string(),
//                 })
//               )
//               .refine(
//                 (options) => {
//                   return (
//                     options.length > 0 ||
//                     !["select", "checkbox", "radio"].includes(this.parent.type)
//                   );
//                 },
//                 {
//                   message:
//                     'O campo "options" é obrigatório para campos do tipo "select", "checkbox" ou "radio".',
//                 }
//               )
//               .optional(),

//             checkbox: z.boolean().optional().default(false),
//           })
//         )
//         .optional(),
//     })
//   ),
//   tags: z
//     .array(
//       z.object({
//         id: z.string().min(1, "O ID da tag é obrigatório."),
//         text: z.string().min(1, "O texto da tag é obrigatório."),
//       })
//     )
//     .min(1, "Pelo menos uma tag é necessária.")
//     .optional(),
// });

// export default function CreateEventForm() {
//   const [activeTab, setActiveTab] = useState("event-info");
//   const form = useForm({
//     resolver: zodResolver(eventSchema),
//     defaultValues: {
//       eventName: "",
//       eventDescription: "",
//       street: "",
//       number: 0,
//       neighborhood: "",
//       localName: "",
//       city: "",
//       state: "",
//       cep: "",
//       eventDateStartEnd: {
//         from: new Date(),
//         to: new Date(),
//       },
//       tickets: [],
//       tags: [],
//     },
//   });

//   const { fields: ticketFields, append: appendTicket } = useFieldArray({
//     control: form.control,
//     name: "tickets",
//   });

//   const { fields: tagFields, append: appendTag } = useFieldArray({
//     control: form.control,
//     name: "tags",
//   });

//   function onSubmit(data) {
//     console.log(data);
//     // Aqui você pode enviar os dados para o seu backend
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <Card className="w-full max-w-4xl mx-auto">
//           <CardHeader>
//             <CardTitle>Criar Novo Evento</CardTitle>
//             <CardDescription>
//               Preencha os detalhes do seu evento esportivo.
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Tabs
//               value={activeTab}
//               onValueChange={setActiveTab}
//               className="w-full"
//             >
//               <TabsList className="grid w-full grid-cols-3">
//                 <TabsTrigger value="event-info">
//                   Informações do Evento
//                 </TabsTrigger>
//                 <TabsTrigger value="location">Localização</TabsTrigger>
//                 <TabsTrigger value="tickets">Ingressos</TabsTrigger>
//               </TabsList>
//               <TabsContent value="event-info" className="space-y-4">
//                 <FormField
//                   control={form.control}
//                   name="eventName"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Nome do Evento</FormLabel>
//                       <FormControl>
//                         <Input
//                           placeholder="Digite o nome do evento"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="eventDescription"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Descrição do Evento</FormLabel>
//                       <FormControl>
//                         <Textarea
//                           placeholder="Descreva seu evento"
//                           className="resize-none"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="eventDateStartEnd"
//                   render={({ field }) => (
//                     <FormItem className="flex flex-col">
//                       <FormLabel>Data do Evento</FormLabel>
//                       <FormControl>
//                         <DatePickerWithRange
//                           selected={field.value}
//                           onSelect={field.onChange}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </TabsContent>
//               <TabsContent value="location" className="space-y-4">
//                 <FormField
//                   control={form.control}
//                   name="localName"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Nome do Local</FormLabel>
//                       <FormControl>
//                         <Input {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="street"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Rua</FormLabel>
//                       <FormControl>
//                         <Input {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="number"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Número</FormLabel>
//                       <FormControl>
//                         <Input type="number" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="neighborhood"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Bairro</FormLabel>
//                       <FormControl>
//                         <Input {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="city"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Cidade</FormLabel>
//                       <FormControl>
//                         <Input {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="state"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Estado</FormLabel>
//                       <FormControl>
//                         <Input {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="cep"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>CEP</FormLabel>
//                       <FormControl>
//                         <Input {...field} placeholder="00000-000" />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </TabsContent>
//               <TabsContent value="tickets" className="space-y-4">
//                 {ticketFields.map((field, index) => (
//                   <Card key={field.id}>
//                     <CardHeader>
//                       <CardTitle>Ingresso {index + 1}</CardTitle>
//                     </CardHeader>
//                     <CardContent className="space-y-4">
//                       <FormField
//                         control={form.control}
//                         name={`tickets.${index}.ticketName`}
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Nome do Ingresso</FormLabel>
//                             <FormControl>
//                               <Input {...field} />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <FormField
//                         control={form.control}
//                         name={`tickets.${index}.ticketPrice`}
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Preço</FormLabel>
//                             <FormControl>
//                               <Input type="number" {...field} />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <FormField
//                         control={form.control}
//                         name={`tickets.${index}.ticketDescription`}
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Descrição</FormLabel>
//                             <FormControl>
//                               <Textarea {...field} />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <FormField
//                         control={form.control}
//                         name={`tickets.${index}.ticketStockAvailable`}
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Quantidade Disponível</FormLabel>
//                             <FormControl>
//                               <Input type="number" {...field} />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <FormField
//                         control={form.control}
//                         name={`tickets.${index}.startEndingSelling`}
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Período de Venda</FormLabel>
//                             <FormControl>
//                               <DatePickerWithRange
//                                 selected={field.value}
//                                 onSelect={field.onChange}
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </CardContent>
//                   </Card>
//                 ))}
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() =>
//                     appendTicket({
//                       ticketName: "",
//                       ticketPrice: 0,
//                       ticketDescription: "",
//                       ticketStockAvailable: 1,
//                       startEndingSelling: { from: new Date(), to: new Date() },
//                     })
//                   }
//                 >
//                   Adicionar Ingresso
//                 </Button>
//               </TabsContent>
//             </Tabs>
//           </CardContent>
//           <CardFooter>
//             <Button type="submit" className="ml-auto">
//               Criar Evento
//             </Button>
//           </CardFooter>
//         </Card>
//       </form>
//     </Form>
//   );
// }

"use client";

import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// const QuillNoSSRWrapper = dynamic(import("react-quill"), {
//   ssr: false,
//   loading: () => <p>Loading...</p>,
// });

import QuillNoSSRWrapper from "react-quill";

const inputType = [
  "text",
  "number",
  "select",
  "checkbox",
  "select",
  "radio",
  "date",
];

const eventSchema = z.object({
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
  street: z.string().min(1, {
    message: "A rua deve ter pelo menos 1 caractere.",
    required_error: "A rua é obrigatória.",
  }),
  number: z.coerce.number(),
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
  cep: z.string().regex(/^\d{5}-\d{3}$/, {
    message: "O código postal deve estar no formato 00000-000.",
    required_error: "O código postal é obrigatório.",
  }),
  eventDateStartEnd: z
    .object({
      from: z.date({ required_error: "Data de início é obrigatória." }),
      to: z.date({ required_error: "Data de término é obrigatória." }),
    })
    .refine((data) => data.to > data.from, {
      message: "A data de término deve ser após a data de início.",
      path: ["eventDateStartEnd"],
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
      ticketPrice: z.coerce
        .number()
        .nonnegative()
        .min(0, { message: "O preço do ingresso não pode ser negativo." }),
      ticketDescription: z
        .string()
        .min(10, {
          message: "A descrição do ingresso deve ter no mínimo 10 caracteres.",
        })
        .max(200, {
          message: "A descrição do ingresso deve ter no máximo 300 caracteres.",
        }),
      ticketStockAvailable: z.coerce.number().positive().int().min(1, {
        message: "A quantidade de ingressos disponíveis deve ser pelo menos 1.",
      }),
      startEndingSelling: z
        .object({
          from: z.date({
            required_error: "Data de início de venda é obrigatória.",
          }),
          to: z.date({
            required_error: "Data de término de venda é obrigatória.",
          }),
        })
        .refine((data) => data.to > data.from, {
          message: "A data de término deve ser após a data de início.",
          path: ["startEndingSelling"],
        }),
      extraFields: z
        .array(
          z.object({
            name: z
              .string()
              .min(1, "O nome do campo personalizado é obrigatório."),
            type: z.enum(inputType, {
              required_error: "por favor escolha o tipo do campo",
            }),
            required: z.boolean(),
            options: z
              .array(
                z.object({
                  id: z.string(),
                  text: z.string(),
                })
              )
              .optional(),
            checkbox: z.boolean().optional().default(false),
          })
        )
        .optional(),
    })
  ),
  tags: z
    .array(
      z.object({
        id: z.string().min(1, "O ID da tag é obrigatório."),
        text: z.string().min(1, "O texto da tag é obrigatório."),
      })
    )
    .min(1, "Pelo menos uma tag é necessária.")
    .optional(),
  bannerImage: z.instanceof(File).optional(),
});

export default function CreateEventForm() {
  const [bannerPreview, setBannerPreview] = useState(null);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      tickets: [
        {
          ticketName: "",
          ticketPrice: 0,
          ticketDescription: "",
          ticketStockAvailable: 1,
          startEndingSelling: { from: new Date(), to: new Date() },
        },
      ],
      tags: [],
    },
  });

  const {
    fields: ticketFields,
    append: appendTicket,
    remove: removeTicket,
  } = useFieldArray({
    control: form.control,
    name: "tickets",
  });

  const onSubmit = async (data) => {
    try {
      // Upload banner image to Firebase Storage
      if (data.bannerImage) {
        const storage = getStorage();
        const storageRef = ref(
          storage,
          `event-banners/${data.eventName}-${Date.now()}`
        );
        await uploadBytes(storageRef, data.bannerImage);
        const bannerUrl = await getDownloadURL(storageRef);
        data.bannerImage = bannerUrl;
      }

      // Here you would typically send the data to your backend API
      console.log("Form data:", data);

      // Redirect to the events list page or show a success message
      router.push("/events");
    } catch (error) {
      console.error("Error creating event:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleBannerUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("bannerImage", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Criar Novo Evento</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="eventName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Evento</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome do evento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="eventDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição do Evento</FormLabel>
                  <FormControl>
                    <QuillNoSSRWrapper theme="snow" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bannerImage"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Banner do Evento</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        handleBannerUpload(e);
                        onChange(e.target.files?.[0]);
                      }}
                      {...field}
                    />
                  </FormControl>
                  {bannerPreview && (
                    <img
                      src={bannerPreview}
                      alt="Banner preview"
                      className="mt-2 max-w-full h-auto"
                    />
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="eventDateStartEnd"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data do Evento</FormLabel>
                  <DatePickerWithRange
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormLabel>Endereço do Evento</FormLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Rua" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="number" placeholder="Número" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="neighborhood"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Bairro" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="localName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Nome do Local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Cidade" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Estado" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cep"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="CEP (00000-000)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div>
              <FormLabel>Ingressos</FormLabel>
              {ticketFields.map((field, index) => (
                <Card key={field.id} className="mt-4">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`tickets.${index}.ticketName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome do Ingresso</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`tickets.${index}.ticketPrice`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preço</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`tickets.${index}.ticketDescription`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Descrição</FormLabel>
                            <FormControl>
                              <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`tickets.${index}.ticketStockAvailable`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quantidade Disponível</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`tickets.${index}.startEndingSelling`}
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormLabel>Período de Venda</FormLabel>
                            <DatePickerWithRange
                              selected={field.value}
                              onSelect={field.onChange}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="mt-2"
                      onClick={() => removeTicket(index)}
                    >
                      Remover Ingresso
                    </Button>
                  </CardContent>
                </Card>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() =>
                  appendTicket({
                    ticketName: "",
                    ticketPrice: 0,
                    ticketDescription: "",
                    ticketStockAvailable: 1,
                    startEndingSelling: { from: new Date(), to: new Date() },
                  })
                }
              >
                Adicionar Ingresso
              </Button>
            </div>

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Adicione tags separadas por vírgula"
                      onBlur={(e) => {
                        const tags = e.target.value
                          .split(",")
                          .map((tag) => ({
                            id: tag.trim(),
                            text: tag.trim(),
                          }))
                          .filter((tag) => tag.text !== "");
                        field.onChange(tags);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Adicione tags relevantes para o seu evento, separadas por
                    vírgula.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Criar Evento</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
