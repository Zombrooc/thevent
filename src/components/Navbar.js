"use client";
import { Fragment, useState } from "react";
import Link from "next/link";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { UserNav } from "./user-nav";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { useForm } from "react-hook-form";

import { Label } from "@/components/ui/label";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

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

const navigation = [
  { name: "Inicío", href: "/", current: true },
  {
    name: "Evento",
    sub: [
      {
        name: "Beach Tennis",
        href: "#",
        current: false,
      },
      {
        name: "Tênis",
        href: "#",
        current: false,
      },
      {
        name: "Corrida",
        href: "#",
        current: false,
      },
      {
        name: "Trial",
        href: "#",
        current: false,
      },
      {
        name: "Muay Thai",
        href: "#",
        current: false,
      },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ user }) {
  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data) {
    try {
      const { success, redirectUrl } =
        await updateUserRoleAndAcceptRecievePromotions(
          data,
          session_token,
          state
        );

      if (success) {
        toast({
          title: "Dados enviados com sucesso!",
          description: "Suas informações foram atualizadas.",
        });
        redirect(redirectUrl);
      }
    } catch (error) {
      toast({
        title: "Erro ao enviar os dados",
        description: "Não foi possível atualizar suas informações.",
      });
    }
  }

  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => {
                      if (item.href) {
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-primary text-white"
                                : "text-gray-700 hover:bg-primary hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </Link>
                        );
                      } else {
                        return (
                          <DropdownMenu key={item.name}>
                            <DropdownMenuTrigger className="text-gray-700 rounded-md px-3 py-2 text-sm font-medium hover:bg-primary hover:text-white">
                              {item.name}
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              {item.sub.map((subItem) => {
                                return (
                                  <Link href={subItem.href} key={subItem.name}>
                                    <DropdownMenuItem
                                      className={classNames(
                                        subItem.current
                                          ? "bg-primary text-white"
                                          : "text-gray-700 hover:bg-primary hover:text-white",
                                        "rounded-md px-3 py-2 text-sm font-medium"
                                      )}
                                      aria-current={
                                        subItem.current ? "page" : undefined
                                      }
                                    >
                                      {subItem.name}
                                    </DropdownMenuItem>
                                  </Link>
                                );
                              })}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex justify-center items-center text-sm font-semibold leading-6 mr-2 bg-primary text-white py-2 px-4 rounded-md hover:bg-violet-800 hover:text-white"
                    >
                      Criar evento
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <div className="mx-auto w-full max-w-2xl">
                      <DrawerHeader>
                        <DrawerTitle>Crie seu evento</DrawerTitle>
                      </DrawerHeader>
                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(onSubmit)}
                          className="space-y-6"
                        >
                          <div className="p-4 pb-0">
                            <FormField
                              control={form.control}
                              name="role"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Qual seu maior objetivo na plataforma?
                                  </FormLabel>
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
                                        Divulgar e vender ingressos do meu
                                        evento
                                      </SelectItem>
                                      <SelectItem value="competitor">
                                        Procurar eventos para participar e
                                        competir
                                      </SelectItem>
                                      <SelectItem value="awards-supplier">
                                        Fornecer premiações para os
                                        organizadores
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>

                                  <FormMessage />
                                </FormItem>
                              )}
                            />
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
                                    <FormLabel>
                                      Receber orçamentos de premiações
                                    </FormLabel>

                                    <FormDescription>
                                      Ao criar o evento receba orçamentos de
                                      diversas empresas parceiras
                                    </FormDescription>
                                  </div>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <DrawerFooter>
                            <Button className="bg-primary text-white">
                              Criar Evento
                            </Button>
                            <DrawerClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                          </DrawerFooter>
                        </form>
                      </Form>
                    </div>
                  </DrawerContent>
                </Drawer>
                <DropdownMenu>
                  <DropdownMenuTrigger className="relative rounded-full p-1 text-gray-700 hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <Link href="/">
                      <DropdownMenuItem>teste notify</DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* Profile dropdown */}
                {user !== undefined ? (
                  <div className="ml-3">
                    <UserNav user={user} />
                  </div>
                ) : (
                  <Link
                    href="/api/auth/login"
                    className="text-sm font-semibold leading-6 text-gray-800 ml-3 hover:bg-primary hover:text-white py-2 px-4 rounded-md"
                  >
                    Entrar <span aria-hidden="true">&rarr;</span>
                  </Link>
                )}
                {/* <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu> */}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-primary text-white"
                      : "text-gray-300 hover:bg-primary hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
