import ConfirmPurchaseClient from "./page-client";
// import { useSelector } from "react-redux";

const getOrder = async (orderId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/tickets/byOrder/${orderId}`,
    { cache: "no-store" }
    // {
    //   next: {
    //     revalidate: 0,
    //   },
    // }
  );

  if (res.status === 200) {
    const { order } = await res.json();
    return order;
  }
};

export default async function EventDetails({ params }) {
  const { total: totalPrice, orderItems } = await getOrder(params.orderId);

  // const { tickets: ticketCart, totalPrice } = useSelector(
  //   (state) => state.ticketCart
  // );

  // console.log(ticketCart);

  return (
    <>
      <ConfirmPurchaseClient totalPrice={totalPrice} orderItems={orderItems} />
    </>
  );
}
