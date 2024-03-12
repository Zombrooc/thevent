import beachTennisBackgroundImage from "@/assets/beachtennis.jpg";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import kenda from "@/assets/kendalogo2.png";
// import uniart from "@/assets/UNIART.svg";

// export default async function Home() {
//   const session = await getSession();

//   return session?.user ? (
//     <div>
//       <Image src={session.user.picture} alt={session.user.name} />
//       <h2>{session.user.name}</h2>
//       <p>{session.user.email}</p>
//       <a href="/api/auth/logout">Logout</a>
//     </div>
//   ) : (
//     <main>
//       <a href="/api/auth/login"> Entrar </a>
//     </main>
//   );

//   return ()
// }

// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { CardContent, CardFooter, Card } from "@/components/ui/card";
import Image from "next/image";

export default async function Home() {
  return (
    <>
      <Navbar />
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
              <form className="flex gap-2">
                <div className="flex-[1_0_0%]">
                  <Label
                    htmlFor="searchEvent"
                    className="block text-sm text-gray-700 font-medium dark:text-white"
                  >
                    <span className="sr-only">Procurar evento</span>
                  </Label>
                  <Input
                    type="text"
                    name="event"
                    id="searchEvent"
                    className="h-[40px] py-1 px-4 w-full rounded-lg border-transparent border-b-primary focus:border-primary focus:ring-primary dark:bg-primary dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
                    placeholder="Procurar evento"
                  />
                </div>
                <div className="flex-[0_0_auto]">
                  <Button
                    type="submit"
                    className="size-[40px] p-1 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
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
