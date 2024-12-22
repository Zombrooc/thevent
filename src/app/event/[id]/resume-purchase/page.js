"use client";

import { useParams } from "next/navigation";
import { startPurchaseAction } from "../_actions/startPurchaseAction";
import { useSelector } from "react-redux";
import { Spinner } from "@/components/ui/spinner";

export default function ResumePurchase() {
  const params = useParams();
  const { id: eventID } = params;

  const { tickets: ticketCart, totalPrice } = useSelector(
    (state) => state.ticketCart
  );

  useEffect(() => {
    const handleAction = async () => {
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
      <Spinner>Loading...</Spinner>
    </div>
  );
}
