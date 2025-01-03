"use client";

import { useParams } from "next/navigation";
import { startPurchaseAction } from "../_actions/startPurchaseAction";
import { useSelector } from "react-redux";
import { Spinner } from "@/components/ui/spinner";
import { useEffect } from "react";
import { getCookies, removeCookies } from "../_actions/handleCookies";

export default function ResumePurchase() {
  const params = useParams();
  const { id: eventID } = params;

  useEffect(() => {
    const handleAction = async () => {
      const { ticketCart, totalPrice } = await getCookies("ticketCart");

      await removeCookies("ticketCart");
      await startPurchaseAction({
        ticketCart,
        totalPrice,
        eventID,
      });
    };

    handleAction();
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Spinner />
    </div>
  );
}
