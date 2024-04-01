import Image from "next/image";
import { getSession } from "@auth0/nextjs-auth0";

import Navbar from "@/components/Navbar";

import beachTennisBackgroundImage from "@/assets/beachtennis.jpg";
import SearchEventInput from "./_components/search-event-input";

export default async function Home() {
  const session = await getSession();

  return (
    <>
      <Navbar user={session?.user} />
      <div className="min-h-full min-w-full ">
        <div className="overflow-hidden">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-12">
            <div className="relative mx-auto max-w-4xl grid space-y-4 sm:space-y-10">
              <div className="mt-5 max-w-2xl text-center mx-auto">
                <h1 className="block font-bold text-gray-800 text-5xl md:text-5xl lg:text-6xl dark:text-gray-200">
                  Viva
                  <span className="bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent">
                    {" "}
                    a emoção!
                  </span>
                </h1>
              </div>

              <div className="mt-5 max-w-3xl text-center mx-auto">
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Seja o Herói do Seu Próprio Esporte, Supere os Limites e faça
                  sua história acontecer.
                </p>
              </div>
              <SearchEventInput />
            </div>
          </div>
        </div>
      </div>

      <div className=" px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto max-w-7xl lg:px-8o">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="aspect-w-12 aspect-h-7 sm:aspect-none rounded-xl overflow-hidden">
              <Image
                className="rounded-t-xl w-full object-cover h-40"
                height="auto"
                width="auto"
                src={beachTennisBackgroundImage}
                alt="Image Description"
              />
            </div>
            {/* <div className="h-40 flex flex-col justify-center items-center rounded-t-xl">
              <Image
                className="w-full object-cover"
                src={beachTennisBackgroundImage}
                alt="Event Poster"
              />
            </div> */}
            <div className="p-4 md:p-6">
              <h3 className="text-lg font-semibold text-primary">
                CORRIDA/CAMINHADA MOVIMENTA IJACI
              </h3>
              <span className="block mb-1 text-xs font-semibold uppercase text-slate-700 dark:text-blue-300">
                14 de abr. de 2024, 08:00 | Lorena, SP, Brasil
              </span>
              {/* <p className="mt-3 text-gray-500">
                A software that develops products for software developers and
                developments.
              </p> */}
            </div>
            <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
              <a
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="/event"
              >
                Detalhes
              </a>
              <a
                className="w-full py-3 px-4 bg-primary inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-ee-xl text-slate-900 shadow-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-blue-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="#"
              >
                Comprar Ingresso
              </a>
            </div>
          </div>

          <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="aspect-w-12 aspect-h-7 sm:aspect-none rounded-t-xl overflow-hidden">
              <Image
                className=" w-full object-cover h-40"
                height="auto"
                width="auto"
                src={beachTennisBackgroundImage}
                alt="Image Description"
              />
            </div>
            {/* <div className="h-40 flex flex-col justify-center items-center rounded-t-xl">
              <Image
                className="w-full object-cover"
                src={beachTennisBackgroundImage}
                alt="Event Poster"
              />
            </div> */}
            <div className="p-4 md:p-6">
              <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-500 dark:hover:text-white">
                CORRIDA/CAMINHADA MOVIMENTA IJACI
              </h3>
              <span className="block mb-1 text-xs font-semibold uppercase text-slate-700 dark:text-blue-300">
                14 de abr. de 2024, 08:00 | Lorena, SP, Brasil
              </span>
              {/* <p className="mt-3 text-gray-500">
                A software that develops products for software developers and
                developments.
              </p> */}
            </div>
            <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
              <a
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="#"
              >
                Detalhes
              </a>
              <a
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-ee-xl bg-blue-600 text-white shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:bg-blue-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="#"
              >
                Comprar Ingresso
              </a>
            </div>
          </div>

          <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="aspect-w-12 aspect-h-7 sm:aspect-none rounded-xl overflow-hidden">
              <Image
                className="rounded-t-xl w-full object-cover h-40"
                height="auto"
                width="auto"
                src={beachTennisBackgroundImage}
                alt="Image Description"
              />
            </div>
            {/* <div className="h-40 flex flex-col justify-center items-center rounded-t-xl">
              <Image
                className="w-full object-cover"
                src={beachTennisBackgroundImage}
                alt="Event Poster"
              />
            </div> */}
            <div className="p-4 md:p-6">
              <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-500 dark:hover:text-white">
                CORRIDA/CAMINHADA MOVIMENTA IJACI
              </h3>
              <span className="block mb-1 text-xs font-semibold uppercase text-slate-700 dark:text-blue-300">
                14 de abr. de 2024, 08:00 | Lorena, SP, Brasil
              </span>
              {/* <p className="mt-3 text-gray-500">
                A software that develops products for software developers and
                developments.
              </p> */}
            </div>
            <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
              <a
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="#"
              >
                Detalhes
              </a>
              <a
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-ee-xl bg-blue-600 text-white shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:bg-blue-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="#"
              >
                Comprar Ingresso
              </a>
            </div>
          </div>

          <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="aspect-w-12 aspect-h-7 sm:aspect-none rounded-xl overflow-hidden">
              <Image
                className="rounded-t-xl w-full object-cover h-40"
                height="auto"
                width="auto"
                src={beachTennisBackgroundImage}
                alt="Image Description"
              />
            </div>
            {/* <div className="h-40 flex flex-col justify-center items-center rounded-t-xl">
              <Image
                className="w-full object-cover"
                src={beachTennisBackgroundImage}
                alt="Event Poster"
              />
            </div> */}
            <div className="p-4 md:p-6">
              <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-500 dark:hover:text-white">
                CORRIDA/CAMINHADA MOVIMENTA IJACI
              </h3>
              <span className="block mb-1 text-xs font-semibold uppercase text-slate-700 dark:text-blue-300">
                14 de abr. de 2024, 08:00 | Lorena, SP, Brasil
              </span>
              {/* <p className="mt-3 text-gray-500">
                A software that develops products for software developers and
                developments.
              </p> */}
            </div>
            <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
              <a
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="#"
              >
                Detalhes
              </a>
              <a
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-ee-xl bg-blue-600 text-white shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:bg-blue-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="#"
              >
                Comprar Ingresso
              </a>
            </div>
          </div>

          <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="aspect-w-12 aspect-h-7 sm:aspect-none rounded-xl overflow-hidden">
              <Image
                className="rounded-t-xl w-full object-cover h-40"
                height="auto"
                width="auto"
                src={beachTennisBackgroundImage}
                alt="Image Description"
              />
            </div>
            {/* <div className="h-40 flex flex-col justify-center items-center rounded-t-xl">
              <Image
                className="w-full object-cover"
                src={beachTennisBackgroundImage}
                alt="Event Poster"
              />
            </div> */}
            <div className="p-4 md:p-6">
              <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-500 dark:hover:text-white">
                CORRIDA/CAMINHADA MOVIMENTA IJACI
              </h3>
              <span className="block mb-1 text-xs font-semibold uppercase text-slate-700 dark:text-blue-300">
                14 de abr. de 2024, 08:00 | Lorena, SP, Brasil
              </span>
              {/* <p className="mt-3 text-gray-500">
                A software that develops products for software developers and
                developments.
              </p> */}
            </div>
            <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
              <a
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="#"
              >
                Detalhes
              </a>
              <a
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-ee-xl bg-blue-600 text-white shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:bg-blue-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="#"
              >
                Comprar Ingresso
              </a>
            </div>
          </div>

          <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="aspect-w-12 aspect-h-7 sm:aspect-none rounded-xl overflow-hidden">
              <Image
                className="rounded-t-xl w-full object-cover h-40"
                height="auto"
                width="auto"
                src={beachTennisBackgroundImage}
                alt="Image Description"
              />
            </div>
            {/* <div className="h-40 flex flex-col justify-center items-center rounded-t-xl">
              <Image
                className="w-full object-cover"
                src={beachTennisBackgroundImage}
                alt="Event Poster"
              />
            </div> */}
            <div className="p-4 md:p-6">
              <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-500 dark:hover:text-white">
                CORRIDA/CAMINHADA MOVIMENTA IJACI
              </h3>
              <span className="block mb-1 text-xs font-semibold uppercase text-slate-700 dark:text-blue-300">
                14 de abr. de 2024, 08:00 | Lorena, SP, Brasil
              </span>
              {/* <p className="mt-3 text-gray-500">
                A software that develops products for software developers and
                developments.
              </p> */}
            </div>
            <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
              <a
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="#"
              >
                Detalhes
              </a>
              <a
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-ee-xl bg-blue-600 text-white shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:bg-blue-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="#"
              >
                Comprar Ingresso
              </a>
            </div>
          </div>

          <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="aspect-w-12 aspect-h-7 sm:aspect-none rounded-xl overflow-hidden">
              <Image
                className="rounded-t-xl w-full object-cover h-40"
                height="auto"
                width="auto"
                src={beachTennisBackgroundImage}
                alt="Image Description"
              />
            </div>
            {/* <div className="h-40 flex flex-col justify-center items-center rounded-t-xl">
              <Image
                className="w-full object-cover"
                src={beachTennisBackgroundImage}
                alt="Event Poster"
              />
            </div> */}
            <div className="p-4 md:p-6">
              <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-500 dark:hover:text-white">
                CORRIDA/CAMINHADA MOVIMENTA IJACI
              </h3>
              <span className="block mb-1 text-xs font-semibold uppercase text-slate-700 dark:text-blue-300">
                14 de abr. de 2024, 08:00 | Lorena, SP, Brasil
              </span>
              {/* <p className="mt-3 text-gray-500">
                A software that develops products for software developers and
                developments.
              </p> */}
            </div>
            <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
              <a
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="#"
              >
                Detalhes
              </a>
              <a
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-ee-xl bg-blue-600 text-white shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:bg-blue-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="#"
              >
                Comprar Ingresso
              </a>
            </div>
          </div>

          <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="aspect-w-12 aspect-h-7 sm:aspect-none rounded-xl overflow-hidden">
              <Image
                className="rounded-t-xl w-full object-cover h-40"
                height="auto"
                width="auto"
                src={beachTennisBackgroundImage}
                alt="Image Description"
              />
            </div>
            {/* <div className="h-40 flex flex-col justify-center items-center rounded-t-xl">
              <Image
                className="w-full object-cover"
                src={beachTennisBackgroundImage}
                alt="Event Poster"
              />
            </div> */}
            <div className="p-4 md:p-6">
              <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-500 dark:hover:text-white">
                CORRIDA/CAMINHADA MOVIMENTA IJACI
              </h3>
              <span className="block mb-1 text-xs font-semibold uppercase text-slate-700 dark:text-blue-300">
                14 de abr. de 2024, 08:00 | Lorena, SP, Brasil
              </span>
              {/* <p className="mt-3 text-gray-500">
                A software that develops products for software developers and
                developments.
              </p> */}
            </div>
            <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
              <a
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="#"
              >
                Detalhes
              </a>
              <a
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-ee-xl bg-blue-600 text-white shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:bg-blue-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="#"
              >
                Comprar Ingresso
              </a>
            </div>
          </div>

          <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="aspect-w-12 aspect-h-7 sm:aspect-none rounded-xl overflow-hidden">
              <Image
                className="rounded-t-xl w-full object-cover h-40"
                height="auto"
                width="auto"
                src={beachTennisBackgroundImage}
                alt="Image Description"
              />
            </div>
            {/* <div className="h-40 flex flex-col justify-center items-center rounded-t-xl">
              <Image
                className="w-full object-cover"
                src={beachTennisBackgroundImage}
                alt="Event Poster"
              />
            </div> */}
            <div className="p-4 md:p-6">
              <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-500 dark:hover:text-white">
                CORRIDA/CAMINHADA MOVIMENTA IJACI
              </h3>
              <span className="block mb-1 text-xs font-semibold uppercase text-slate-700 dark:text-blue-300">
                14 de abr. de 2024, 08:00 | Lorena, SP, Brasil
              </span>
              {/* <p className="mt-3 text-gray-500">
                A software that develops products for software developers and
                developments.
              </p> */}
            </div>
            <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
              <a
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="#"
              >
                Detalhes
              </a>
              <a
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-ee-xl bg-blue-600 text-white shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:bg-blue-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="#"
              >
                Comprar Ingresso
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
