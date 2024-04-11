import TicketItem from "./TicketItem";

export default function TicketList({ tickets }) {
  return (
    <div className="col-span-2 h-full flex flex-col">
      {" "}
      <h2 className=" mt-10 text-3xl font-semibold leading-7 text-gray-900">
        Ingressos
      </h2>
      <div className=" mt-4 flex flex-col gap-4">
        {tickets.map((ticket) => (
          <TicketItem ticket={ticket} key={ticket.id} />
        ))}
      </div>
    </div>
  );
}
