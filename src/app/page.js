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
      <div className="relative min-h-full min-w-full bg-white">
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        <div className="overflow-hidden">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="relative mx-auto max-w-4xl grid space-y-5 sm:space-y-10">
              <div className="text-center">
                <p className="text-xs font-semibold text-gray-500 tracking-wide uppercase mb-3 dark:text-gray-200">
                  Grandes eventos
                </p>
                <h1 className="text-3xl text-gray-800 font-bold sm:text-5xl lg:text-6xl lg:leading-tight dark:text-gray-200">
                  Turn online shoppers into{" "}
                  <span className="text-blue-500">lifetime customers</span>
                </h1>
              </div>
              <form>
                <div className="relative z-10 flex space-x-3 p-3 bg-white border rounded-lg shadow-lg shadow-gray-100 dark:bg-slate-900 dark:border-gray-700 dark:shadow-gray-900/[.2]">
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="h-52 flex flex-col justify-center items-center rounded-t-xl">
              <Image
                className="w-full object-cover"
                src={beachTennisBackgroundImage}
                alt="Event Poster"
              />
            </div>
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
