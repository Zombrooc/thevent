// import { useForm } from "react-hook-form";

// import { Label } from "@/components/ui/label";

// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectItem,
//   SelectValue,
// } from "@/components/ui/select";
import * as React from "react";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";

// import {
//   Form,
//   FormItem,
//   FormField,
//   FormLabel,
//   FormDescription,
//   FormMessage,
//   FormControl,
// } from "@/components/ui/form";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

// import { toast } from "@/components/ui/use-toast";

// const checkBoxOptions = [
//   { name: "run", label: "Corrida" },
//   { name: "footBall", label: "Futebol" },
//   { name: "bike", label: "Ciclismo" },
//   { name: "mtb", label: "MTB" },
//   { name: "muayThai", label: "Muay Thai" },
//   { name: "boxe", label: "Boxe" },
//   { name: "mma", label: "MMA" },
//   { name: "tennis", label: "Tênis" },
//   { name: "beachTennis", label: "Beach Tennis" },
//   { name: "padel", label: "Padel" },
//   { name: "cattleFair", label: "Feira de Gado" },
// ];

// const FormSchema = z.object({
//   favoriteSports: z
//     .array(z.string())
//     .refine((value) => value.some((item) => item), {
//       message: "Você precisa escolher pelo menos um esporte",
//     }),
//   role: z.string({
//     required_error: "Selecione um objetivo.",
//   }),
//   awardsPartnerGroup: z.boolean().default(false).optional(),
// });

// import { Checkbox } from "@/components/ui/checkbox";

// import { updateUserRoleAndAcceptRecievePromotions } from "./actions";
// import { useSearchParams } from "next/navigation";
// import Link from "next/link";
// import { cn } from "@/lib/utils";
import { createStripeCustomer } from "@/lib/stripe";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Redirect from "./_components/redirect";

function validateRedirectUrl(url) {
  // Check if URL is empty or undefined
  if (!url) {
    return false;
  }

  // Basic format check
  const urlRegex = /^(http|https):\/\/[^\s]+/;
  if (!urlRegex.test(url)) {
    return false;
  }

  return true;
}

const onboardingFlow = async (sessionClaims) => {
  const customer = await createStripeCustomer(
    sessionClaims.email,
    sessionClaims.fullName
  );

  await clerkClient.users.updateUserMetadata(sessionClaims.sub, {
    privateMetadata: {
      stripeId: customer.id,
    },
  });

  return { success: true };

  //   try {
  //     const { data } = await axios.post(
  //       `${process.env.NEXT_PUBLIC_API_URL}/api/v1/onboarding/flow`,
  //       {
  //         session_token,
  //         state,
  //       }
  //     );
  //     return data;
  //   } catch (error) {
  //     return error;
  //   }

  // const customer = await createStripeCustomer()
};

export default async function Setup() {
  const { sessionClaims } = auth();
  const onBoargingDone = onboardingFlow(sessionClaims);

  if (onBoargingDone.success) {
    return <Redirect />;
  }

  return (
    <h1> Implementando dados... </h1>
    // <>
    //   <Form {...form}>
    //     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    //       <FormField
    //         control={form.control}
    //         name="favoriteSports"
    //         render={() => (
    //           <FormItem>
    //             <div className="mb-4">
    //               <FormLabel className="text-base">Meus esportes</FormLabel>
    //               <FormDescription>
    //                 Escolha seus esportes favoritos.
    //               </FormDescription>
    //             </div>
    //             <div className="grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
    //               {checkBoxOptions.map((item) => (
    //                 <FormField
    //                   key={item.name}
    //                   control={form.control}
    //                   name="favoriteSports"
    //                   render={({ field }) => {
    //                     return (
    //                       <FormItem key={item.name}>
    //                         <FormControl>
    //                           <Checkbox
    //                             className="hidden"
    //                             checked={field.value?.includes(item.name)}
    //                             onCheckedChange={(checked) => {
    //                               return checked
    //                                 ? field.onChange([
    //                                     ...field.value,
    //                                     item.name,
    //                                   ])
    //                                 : field.onChange(
    //                                     field.value?.filter(
    //                                       (value) => value !== item.name
    //                                     )
    //                                   );
    //                             }}
    //                           />
    //                         </FormControl>
    //                         <FormLabel
    //                           className={cn(
    //                             "text-sm h-[50px] flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow bg-white select-none cursor-pointer border-gray-200 py-3 px-6 transition-colors duration-200 ease-in-out peer-checked:bg-primary peer-checked:text-white ",
    //                             field.value?.includes(item.name)
    //                               ? "bg-primary text-white"
    //                               : ""
    //                           )}
    //                         >
    //                           {item.label}
    //                         </FormLabel>
    //                       </FormItem>
    //                     );
    //                   }}
    //                 />
    //               ))}
    //             </div>
    //             <FormMessage />
    //           </FormItem>
    //         )}
    //       />
    //       <Button className="w-full" type="submit">
    //         Finalizar cadastro
    //       </Button>
    //     </form>
    //   </Form>
    //   {/* <Form {...form}>
    //     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
    //       <div className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-5">
    //         <FormField
    //           control={form.control}
    //           name="items"
    //           render={() => (
    //             <FormItem>
    //               <div className="mb-4">
    //                 <FormLabel className="text-base">Sidebar</FormLabel>
    //                 <FormDescription>
    //                   Select the items you want to display in the sidebar.
    //                 </FormDescription>
    //               </div>
    //               {checkBoxOptions.map((item) => (
    //                 <FormField
    //                   key={item.name}
    //                   control={form.control}
    //                   name="favoriteSports"
    //                   render={({ field }) => {
    //                     return (
    //                       <FormItem
    //                         key={item.name}
    //                         className="flex flex-row items-start space-x-3 space-y-0"
    //                       >
    //                         <FormControl>
    //                           <Checkbox
    //                             checked={field.value?.includes(item.name)}
    //                             onCheckedChange={(checked) => {
    //                               return checked
    //                                 ? field.onChange([
    //                                     ...field.value,
    //                                     item.name,
    //                                   ])
    //                                 : field.onChange(
    //                                     field.value?.filter(
    //                                       (value) => value !== item.name
    //                                     )
    //                                   );
    //                             }}
    //                           />
    //                         </FormControl>
    //                         <FormLabel className="text-sm font-normal">
    //                           {item.label}
    //                         </FormLabel>
    //                       </FormItem>
    //                     );
    //                   }}
    //                 />
    //               ))}
    //               <FormMessage />
    //             </FormItem>
    //           )}
    //         />

    //         {checkBoxOptions.map((option, index) => (
    //           <FormField
    //             key={index}
    //             control={form.control}
    //             name={option.name}
    //             render={({ field }) => (
    //               <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
    //                 <FormControl>
    //                   <>
    //                     <Checkbox
    //                       checked={field.value}
    //                       onCheckedChange={field.onChange}
    //                     />
    //                     <div className="space-y-1 leading-none">
    //                       <FormLabel>{option.label}</FormLabel>
    //                     </div>
    //                   </>
    //                 </FormControl>
    //               </FormItem>
    //             )}
    //           />
    //         ))}
    //       </div>

    //       <Button type="submit">Submit</Button>
    //     </form>
    //   </Form> */}
    // </>
    // <Form {...form}>
    //   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
    //     <FormField
    //       control={form.control}
    //       name="role"
    //       render={({ field }) => (
    //         <FormItem>
    //           <FormLabel>Qual seu maior objetivo na plataforma?</FormLabel>
    //           <Select
    //             onValueChange={field.onChange}
    //             defaultValue={field.value}
    //             className="w-full"
    //           >
    //             <FormControl>
    //               <SelectTrigger>
    //                 <SelectValue placeholder="Selecione seu objetivo" />
    //               </SelectTrigger>
    //             </FormControl>
    //             <SelectContent>
    //               <SelectItem value="organizer">
    //                 Divulgar e vender ingressos do meu evento
    //               </SelectItem>
    //               <SelectItem value="competitor">
    //                 Procurar eventos para participar e competir
    //               </SelectItem>
    //               <SelectItem value="awards-supplier">
    //                 Fornecer premiações para os organizadores
    //               </SelectItem>
    //             </SelectContent>
    //           </Select>

    //           <FormMessage />
    //         </FormItem>
    //       )}
    //     />
    //     <FormField
    //       control={form.control}
    //       name="awardsPartnerGroup"
    //       render={({ field }) => (
    //         <FormItem className="flex flex-row items-start space-x-3 space-y-0">
    //           <FormControl>
    //             <Checkbox
    //               checked={field.value}
    //               onCheckedChange={field.onChange}
    //             />
    //           </FormControl>
    //           <div className="space-y-1 leading-none">
    //             <FormLabel>Receber orçamentos de premiações</FormLabel>

    //             <FormDescription>
    //               Ao criar o evento receba orçamentos de diversas empresas
    //               parceiras
    //             </FormDescription>
    //           </div>
    //           <FormMessage />
    //         </FormItem>
    //       )}
    //     />
    //     <Button type="submit">Continuar</Button>
    //   </form>
    // </Form>
  );
}
