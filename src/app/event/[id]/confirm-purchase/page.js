"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function EventDetails({ params }) {
  const { tickets: ticketCart, totalPrice } = useSelector(
    (state) => state.ticketCart
  );

  const { register, handleSubmit } = useForm();
  console.log(ticketCart);

  return (
    <>
      <div className="max-w-5xl rounded-xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 bg-white ">
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Resumo do Pedido</h3>
          <ul className="divide-y divide-gray-200">
            {/* {Object.values(ticketCart)
              .filter((ticket) => ticket.quantity > 0)
              .map((ticket) =>
                [...Array(ticket.quantity)].map((e, i) => (
                  <li
                    key={`${ticket.id}${i}`}
                    className="py-4 flex justify-between items-center"
                  >
                    <div>
                      <h4 className="text-lg font-bold">{ticket.ticketName}</h4>
                      {/* <p className="text-sm text-gray-500">
                      Quantidade: {ticket.quantity}
                    </p>
                      {Object.values(ticket.form.fields).map((field) => (
                        <p key={field.name}>
                          {field.label}
                          <Input
                            placeholder={field.name}
                            type={field.type}
                            required={ticket.form.fields.required}
                          />
                        </p>
                      ))}
                    </div>
                    <p className="text-sm font-medium">
                      R${ticket.price.toFixed(2)}
                    </p>
                    <br />
                  </li>
                ))
              )} */}
            {ticketCart
              .filter((ticket) => ticket.quantity > 0)
              .map((ticket) => (
                <li
                  key={ticket.id}
                  className="py-4 flex justify-between items-center"
                >
                  <div>
                    <h4 className="text-lg font-bold">{ticket.ticketName}</h4>
                    <p className="text-sm text-gray-500">
                      Quantidade: {ticket.quantity}
                    </p>
                    {[...Array(ticket.quantity)].map((e, i) => (
                      <Fragment key={i}>
                        <h4 className="text-lg font-bold">
                          {ticket.ticketName} - {i + 1}
                        </h4>
                        {ticket.form.fields.map((field, index) => (
                          <Fragment key={index}>
                            {field.type === "text" && (
                              <p key={field.name}>
                                {field.name}
                                <Input
                                  placeholder={field.name}
                                  type="text"
                                  required={field.required}
                                  {...register(field.name)}
                                />
                              </p>
                            )}

                            {field.type === "select" && (
                              <Select
                                {...register(field.name)}
                                required={field.required}
                              >
                                <SelectTrigger className="w-[280px]">
                                  <SelectValue
                                    placeholder={`Escolha um ${field.name}`}
                                  />
                                </SelectTrigger>
                                <SelectContent>
                                  {field.options.map(({ text, id }) => (
                                    <SelectItem value={text} key={id}>
                                      {text}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          </Fragment>
                        ))}
                      </Fragment>
                    ))}
                  </div>
                  <p className="text-sm font-medium">
                    R${ticket.price.toFixed(2)}
                  </p>
                  <br />
                </li>
              ))}
          </ul>
          <div className="pt-4 flex justify-between">
            <span className="text-lg font-medium">Total</span>
            <span className="text-lg font-medium">
              R$
              {totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
