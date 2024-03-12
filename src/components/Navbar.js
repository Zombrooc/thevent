"use client";

import { Fragment, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";

const products = [
  {
    name: "Beach Tennis",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Tênis",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Corrida",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Trial",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Muay Thai",
    href: "#",
    icon: ArrowPathIcon,
  },
];
const callsToAction = [{ name: "Mais", href: "#", icon: PlayCircleIcon }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Início
          </a>
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              Eventos
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon
                          className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-auto">
                        <a
                          href={item.href}
                          className="block font-semibold text-gray-900"
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  {callsToAction.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                    >
                      <item.icon
                        className="h-5 w-5 flex-none text-gray-400"
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
          {/* <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Company
          </a> */}
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        Product
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex-none"
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...products, ...callsToAction].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Marketplace
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Company
                </a>
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}

// "use client";

// import * as React from "react";
// import Link from "next/link";
// import { cn } from "@/lib/utils";
// import { getSession } from "@auth0/nextjs-auth0";
// import Image from "next/image";

// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuIndicator,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   NavigationMenuViewport,
//   navigationMenuTriggerStyle,
// } from "@/components/ui/navigation-menu";

// const components = [
//   {
//     title: "Alert Dialog",
//     href: "/docs/primitives/alert-dialog",
//     description:
//       "A modal dialog that interrupts the user with important content and expects a response.",
//   },
//   {
//     title: "Hover Card",
//     href: "/docs/primitives/hover-card",
//     description:
//       "For sighted users to preview content available behind a link.",
//   },
//   {
//     title: "Progress",
//     href: "/docs/primitives/progress",
//     description:
//       "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
//   },
//   {
//     title: "Scroll-area",
//     href: "/docs/primitives/scroll-area",
//     description: "Visually or semantically separates content.",
//   },
//   {
//     title: "Tabs",
//     href: "/docs/primitives/tabs",
//     description:
//       "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
//   },
//   {
//     title: "Tooltip",
//     href: "/docs/primitives/tooltip",
//     description:
//       "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
//   },
// ];

// export default function Navbar() {
//   // const session = getSession();

//   return (
//     <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-9 w-full bg-white border-b border-gray-200 text-sm py-3 sm:py-0 dark:bg-gray-800 dark:border-gray-700">
//       <nav className="relative max-w-7xl w-full mx-auto px-4 py-2 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between">
//           <a
//             className="flex-none text-xl font-semibold dark:text-white"
//             href="#"
//             aria-label="Brand"
//           >
//             Eventos
//           </a>
//         </div>
//         {/* <div>
//           <div className="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:ps-7">
//             <Link
//               className="font-medium text-blue-600 sm:py-6 dark:text-blue-500"
//               href="/"
//             >
//               Home
//             </Link>
//             <a
//               className="font-medium text-gray-500 hover:text-gray-400 sm:py-6 dark:text-gray-400 dark:hover:text-gray-500"
//               href="#"
//             >
//               Account
//             </a>
//             <a
//               className="font-medium text-gray-500 hover:text-gray-400 sm:py-6 dark:text-gray-400 dark:hover:text-gray-500"
//               href="#"
//             >
//               Work
//             </a>
//             <a
//               className="font-medium text-gray-500 hover:text-gray-400 sm:py-6 dark:text-gray-400 dark:hover:text-gray-500"
//               href="#"
//             >
//               Blog
//             </a>
//             <div className="hs-dropdown [--strategy:static] sm:[--strategy:fixed] [--adaptive:none] sm:[--trigger:hover] sm:py-4">
//               <button
//                 type="button"
//                 className="flex items-center w-full text-gray-500 hover:text-gray-400 font-medium dark:text-gray-400 dark:hover:text-gray-500 "
//               >
//                 Eventos
//                 <svg
//                   className="ms-2 size-2.5 text-gray-600"
//                   width="16"
//                   height="16"
//                   viewBox="0 0 16 16"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                   ></path>
//                 </svg>
//               </button>

//               <div className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 sm:w-48 hidden z-10 bg-white sm:shadow-md rounded-lg p-2 dark:bg-gray-800 sm:dark:border dark:border-gray-700 dark:divide-gray-700 before:absolute top-full sm:border before:-top-5 before:start-0 before:w-full before:h-5">
//                 <a
//                   className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//                   href="#"
//                 >
//                   About
//                 </a>
//                 <div className="hs-dropdown relative [--strategy:static] sm:[--strategy:absolute] [--adaptive:none] sm:[--trigger:hover]">
//                   <button
//                     type="button"
//                     className="w-full flex justify-between items-center text-sm text-gray-800 rounded-lg py-2 px-3 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//                   >
//                     Sub Menu
//                     <svg
//                       className="sm:-rotate-90 ms-2 size-2.5 text-gray-600"
//                       width="16"
//                       height="16"
//                       viewBox="0 0 16 16"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                       ></path>
//                     </svg>
//                   </button>

//                   <div className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 sm:w-48 hidden z-10 sm:mt-2 bg-white sm:shadow-md rounded-lg p-2 dark:bg-gray-800 sm:dark:border dark:border-gray-700 dark:divide-gray-700 before:absolute sm:border before:-end-5 before:top-0 before:h-full before:w-5 top-0 end-full !mx-[10px]">
//                     <a
//                       className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//                       href="#"
//                     >
//                       About
//                     </a>
//                     <a
//                       className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//                       href="#"
//                     >
//                       Downloads
//                     </a>
//                     <a
//                       className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//                       href="#"
//                     >
//                       Team Account
//                     </a>
//                   </div>
//                 </div>

//                 <a
//                   className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//                   href="#"
//                 >
//                   Downloads
//                 </a>
//                 <a
//                   className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//                   href="#"
//                 >
//                   Team Account
//                 </a>
//               </div>
//             </div>

//             <div className="pt-3 md:pt-0">
//               {session?.user ? (
//                 <>
//                   <div className="hs-dropdown relative md:inline-flex hidden">
//                     <button
//                       id="userInfoDropdown"
//                       type="button"
//                       className="hs-dropdown-toggle py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//                     >
//                       <Image
//                         className="w-8 h-auto rounded-full"
//                         width="32"
//                         height="32"
//                         src={session?.user?.picture}
//                         alt={session?.user?.name}
//                       />
//                       <span className="text-gray-600 font-medium truncate max-w-[7.5rem] dark:text-gray-400">
//                         {session?.user?.name}
//                       </span>
//                       <svg
//                         className="hs-dropdown-open:rotate-180 size-4"
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       >
//                         <path d="m6 9 6 6 6-6" />
//                       </svg>
//                     </button>

//                     <div
//                       className="hs-dropdown-menu hidden transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 z-10 min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 divide-y divide-gray-200 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700"
//                       aria-labelledby="userInfoDropdown"
//                     >
//                       <div className="py-2 first:pt-0 last:pb-0">
//                         <a
//                           className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
//                           href="#"
//                         >
//                           Meus Ingressos
//                         </a>
//                         <a
//                           className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
//                           href="#"
//                         >
//                           Organização
//                         </a>
//                       </div>
//                       <div className="py-2 first:pt-0 last:pb-0">
//                         <a
//                           className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
//                           href="#"
//                         >
//                           Upgrade License
//                         </a>
//                       </div>
//                       <div className="py-2 first:pt-0 last:pb-0">
//                         <Link
//                           className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
//                           href="/settings"
//                         >
//                           Configurações
//                         </Link>
//                         <Link
//                           className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
//                           href="/api/auth/logout"
//                         >
//                           Sair
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="block md:hidden">
//                     <div className="py-3">
//                       <div className="flex items-center gap-x-3">
//                         <Image
//                           className="flex-shrink-0 inline-block size-10 rounded-full ring-2 ring-white dark:ring-gray-800"
//                           src={session?.user?.picture}
//                           alt="Image Description"
//                           width={40}
//                           height={40}
//                         />
//                         <div className="grow">
//                           <h4 className="font-semibold text-gray-800 dark:text-white">
//                             {session?.user?.given_name +
//                               " " +
//                               session?.user?.family_name}{" "}
//                           </h4>
//                           <p className="text-sm text-gray-500">
//                             {session?.user?.email}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                     <hr />
//                     <div className="py-2 px-4 flex justify-between items-center">
//                       <button
//                         type="button"
//                         className=" py-1.5 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-full border border-transparent hover:bg-zinc-100 hover:text-red-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//                       >
//                         Sair
//                       </button>
//                     </div>
//                   </div>
//                 </>
//               ) : (
//                 <Link
//                   className="py-2.5 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//                   href="/api/auth/login"
//                 >
//                   <svg
//                     className="flex-shrink-0 size-4"
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
//                     <circle cx="12" cy="7" r="4" />
//                   </svg>
//                   Entrar
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div> */}
//         <NavigationMenu>
//           <NavigationMenuList>
//             <NavigationMenuItem>
//               <Link href="/" legacyBehavior passHref>
//                 <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//                   Início
//                 </NavigationMenuLink>
//               </Link>
//             </NavigationMenuItem>
//             <NavigationMenuItem>
//               <NavigationMenuTrigger>Components</NavigationMenuTrigger>
//               <NavigationMenuContent>
//                 <NavigationMenuList>
//                   <NavigationMenuItem>
//                     <Link href="/" legacyBehavior passHref>
//                       <NavigationMenuLink
//                         className={navigationMenuTriggerStyle()}
//                       >
//                         Início
//                       </NavigationMenuLink>
//                     </Link>
//                   </NavigationMenuItem>
//                   <NavigationMenuItem>
//                     <Link href="/" legacyBehavior passHref>
//                       <NavigationMenuLink
//                         className={navigationMenuTriggerStyle()}
//                       >
//                         Início
//                       </NavigationMenuLink>
//                     </Link>
//                   </NavigationMenuItem>
//                 </NavigationMenuList>
//                 {/* <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
//                   {components.map((component) => (
//                     <ListItem
//                       key={component.title}
//                       title={component.title}
//                       href={component.href}
//                     >
//                       {component.description}
//                     </ListItem>
//                   ))}
//                 </ul> */}
//               </NavigationMenuContent>
//             </NavigationMenuItem>
//           </NavigationMenuList>
//         </NavigationMenu>
//       </nav>
//     </header>
//   );
// }

// const ListItem = React.forwardRef(
//   ({ className, title, children, ...props }, ref) => {
//     return (
//       <li>
//         <NavigationMenuLink asChild>
//           <a
//             ref={ref}
//             className={cn(
//               "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
//               className
//             )}
//             {...props}
//           >
//             <div className="text-sm font-medium leading-none">{title}</div>
//             <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//               {children}
//             </p>
//           </a>
//         </NavigationMenuLink>
//       </li>
//     );
//   }
// );
// ListItem.displayName = "ListItem";
