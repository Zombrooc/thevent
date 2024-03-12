import beachTennisBackgroundImage from "@/assets/beachtennis.jpg";
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
              <form>
                <div className="relative flex space-x-3 p-3 bg-white border rounded-lg shadow-lg shadow-gray-100 dark:bg-slate-900 dark:border-gray-700 dark:shadow-gray-900/[.2]">
                  <div className="flex-[1_0_0%]">
                    <label
                      htmlFor="hs-search-article-1"
                      className="block text-sm text-gray-700 font-medium dark:text-white"
                    >
                      <span className="sr-only">Procurar evento</span>
                    </label>
                    <input
                      type="text"
                      name="hs-search-article-1"
                      id="hs-search-article-1"
                      className="py-2.5 px-4 block w-full border-transparent rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600"
                      placeholder="Search article"
                    />
                  </div>
                  <div className="flex-[0_0_auto]">
                    <a
                      className="size-[46px] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      href="#"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <div className="h-36 sm:h-56 flex flex-col justify-center border border-gray-200 rounded-xl text-center p-4 md:p-5 dark:border-gray-700 bg-white">
                <div className="flex justify-center items-center size-12 bg-gradient-to-br from-blue-600 to-violet-600 rounded-lg mx-auto">
                  <svg
                    className="flex-shrink-0 size-7 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="10" x="3" y="11" rx="2" />
                    <circle cx="12" cy="5" r="2" />
                    <path d="M12 7v4" />
                    <line x1="8" x2="8" y1="16" y2="16" />
                    <line x1="16" x2="16" y1="16" y2="16" />
                  </svg>
                </div>

                <div className="mt-3">
                  <h3 className="text-sm sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Creative minds
                  </h3>
                </div>
              </div>

              <div className="h-36 sm:h-56 flex flex-col justify-center border border-gray-200 rounded-xl text-center p-4 md:p-5 dark:border-gray-700 bg-white">
                <div className="flex justify-center items-center size-12 bg-gradient-to-br from-blue-600 to-violet-600 rounded-lg mx-auto">
                  <svg
                    className="flex-shrink-0 size-7 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m7.5 4.27 9 5.15" />
                    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                    <path d="m3.3 7 8.7 5 8.7-5" />
                    <path d="M12 22V12" />
                  </svg>
                </div>

                <div className="mt-3">
                  <h3 className="text-sm sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Effortless updates
                  </h3>
                </div>
              </div>

              <div className="h-36 sm:h-56 flex flex-col justify-center border border-gray-200 rounded-xl text-center p-4 md:p-5 dark:border-gray-700 bg-white">
                <div className="flex justify-center items-center size-12 bg-gradient-to-br from-blue-600 to-violet-600 rounded-lg mx-auto">
                  <svg
                    className="flex-shrink-0 size-7 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>

                <div className="mt-3">
                  <h3 className="text-sm sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Strong empathy
                  </h3>
                </div>
              </div>

              <div className="h-36 sm:h-56 flex flex-col justify-center border border-gray-200 rounded-xl text-center p-4 md:p-5 dark:border-gray-700 bg-white">
                <div className="flex justify-center items-center size-12 bg-gradient-to-br from-blue-600 to-violet-600 rounded-lg mx-auto">
                  <svg
                    className="flex-shrink-0 size-7 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                    <path d="M4 22h16" />
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                  </svg>
                </div>

                <div className="mt-3">
                  <h3 className="text-sm sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Conquer the best
                  </h3>
                </div>
              </div>

              <div className="h-36 sm:h-56 flex flex-col justify-center border border-gray-200 rounded-xl text-center p-4 md:p-5 dark:border-gray-700 bg-white">
                <div className="flex justify-center items-center size-12 bg-gradient-to-br from-blue-600 to-violet-600 rounded-lg mx-auto">
                  <svg
                    className="flex-shrink-0 size-7 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>

                <div className="mt-3">
                  <h3 className="text-sm sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Designing for people
                  </h3>
                </div>
              </div>

              <div className="h-36 sm:h-56 flex flex-col justify-center border border-gray-200 rounded-xl text-center p-4 md:p-5 dark:border-gray-700 bg-white">
                <div className="flex justify-center items-center size-12 bg-gradient-to-br from-blue-600 to-violet-600 rounded-lg mx-auto">
                  <svg
                    className="flex-shrink-0 size-7 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 10v12" />
                    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                  </svg>
                </div>

                <div className="mt-3">
                  <h3 className="text-sm sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Simple and affordable
                  </h3>
                </div>
              </div>

              <div className="h-36 sm:h-56 flex flex-col justify-center border border-gray-200 rounded-xl text-center p-4 md:p-5 dark:border-gray-700 bg-white">
                <div className="flex justify-center items-center size-12 bg-gradient-to-br from-blue-600 to-violet-600 rounded-lg mx-auto">
                  <svg
                    className="flex-shrink-0 size-7 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 3h20" />
                    <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
                    <path d="m7 21 5-5 5 5" />
                  </svg>
                </div>

                <div className="mt-3">
                  <h3 className="text-sm sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Get freelance work
                  </h3>
                </div>
              </div>

              <div className="h-36 sm:h-56 flex flex-col justify-center border border-gray-200 rounded-xl text-center p-4 md:p-5 dark:border-gray-700 bg-white">
                <div className="flex justify-center items-center size-12 bg-gradient-to-br from-blue-600 to-violet-600 rounded-lg mx-auto">
                  <svg
                    className="flex-shrink-0 size-7 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                    <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
                    <path d="M2 7h20" />
                    <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
                  </svg>
                </div>

                <div className="mt-3">
                  <h3 className="text-sm sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Sell your goods
                  </h3>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <div className="sm:w-1/2 xl:w-1/3 mx-auto text-center mb-6 md:mb-12">
              <h2 className="text-xl font-semibold md:text-2xl md:leading-tight text-gray-800 dark:text-gray-200">
                Confiado por mais de 2500 de vocês
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 lg:gap-6">
              <div className="p-4 md:p-7 bg-yellow-300 rounded-lg dark:bg-slate-800">
                <Image
                  src={uniart}
                  alt="Organizer Logo"
                  className=" py-3 lg:py-5 w-16 h-auto md:w-20 lg:w-24 mx-auto text-gray-800 dark:text-gray-200"
                />
              </div>
              <div className="p-4 md:p-7 bg-zinc-800 rounded-lg dark:bg-slate-800">
                <Image
                  src={kenda}
                  alt="Organizer Logo"
                  className="py-3 lg:py-5 w-16 h-auto md:w-20 lg:w-24 mx-auto text-gray-800 dark:text-gray-200"
                />
              </div>
              <div className="p-4 md:p-7 bg-yellow-300 rounded-lg dark:bg-slate-800">
                <Image
                  src={uniart}
                  alt="Organizer Logo"
                  className=" py-3 lg:py-5 w-16 h-auto md:w-20 lg:w-24 mx-auto text-gray-800 dark:text-gray-200"
                />
              </div>
              <div className="p-4 md:p-7 bg-zinc-800 rounded-lg dark:bg-slate-800">
                <Image
                  src={kenda}
                  alt="Organizer Logo"
                  className="py-3 lg:py-5 w-16 h-auto md:w-20 lg:w-24 mx-auto text-gray-800 dark:text-gray-200"
                />
              </div>
              <div className="p-4 md:p-7 bg-yellow-300 rounded-lg dark:bg-slate-800">
                <Image
                  src={uniart}
                  alt="Organizer Logo"
                  className=" py-3 lg:py-5 w-16 h-auto md:w-20 lg:w-24 mx-auto text-gray-800 dark:text-gray-200"
                />
              </div>
              <div className="p-4 md:p-7 bg-zinc-800 rounded-lg dark:bg-slate-800">
                <Image
                  src={kenda}
                  alt="Organizer Logo"
                  className="py-3 lg:py-5 w-16 h-auto md:w-20 lg:w-24 mx-auto text-gray-800 dark:text-gray-200"
                />
              </div>
              <div className="p-4 md:p-7 bg-yellow-300 rounded-lg dark:bg-slate-800">
                <Image
                  src={uniart}
                  alt="Organizer Logo"
                  className=" py-3 lg:py-5 w-16 h-auto md:w-20 lg:w-24 mx-auto text-gray-800 dark:text-gray-200"
                />
              </div>
              <div className="p-4 md:p-7 bg-zinc-800 rounded-lg dark:bg-slate-800">
                <Image
                  src={kenda}
                  alt="Organizer Logo"
                  className="py-3 lg:py-5 w-16 h-auto md:w-20 lg:w-24 mx-auto text-gray-800 dark:text-gray-200"
                />
              </div>
              <div className="p-4 md:p-7 bg-yellow-300 rounded-lg dark:bg-slate-800">
                <Image
                  src={uniart}
                  alt="Organizer Logo"
                  className=" py-3 lg:py-5 w-16 h-auto md:w-20 lg:w-24 mx-auto text-gray-800 dark:text-gray-200"
                />
              </div>
            </div>
          </div> */}
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
