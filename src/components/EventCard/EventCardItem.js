import Image from "next/image";
import moment from "moment";

export default function EventCardItem({ event }) {
  return (
    <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
      <div className="max-h-72 aspect-w-12 aspect-h-7 sm:aspect-none rounded-xl overflow-hidden">
        <Image
          className="rounded-t-xl w-full object-cover h-40"
          height="500"
          width="500"
          // fill
          src={event.bannerImage}
          alt="Image Description"
        />
      </div>

      <div className="p-4 md:p-6">
        <h3 className="text-lg font-semibold text-primary">
          {event.eventName}
        </h3>
        <span className="block mb-1 text-xs font-semibold uppercase text-slate-700 dark:text-blue-300">
          {moment(event.eventDateStart).format("DD/MM/YYYY")} -{" "}
          {moment(event.eventDateEnd).format("DD/MM/YYYY")} |{" "}
          {event.addresses.city}, {event.addresses.state}
        </span>
        {/* <p className="mt-3 text-gray-500">
                A software that develops products for software developers and
                developments.
              </p> */}
      </div>
      <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
        <a
          className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          href={`/event/${event.id}`}
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
  );
}
