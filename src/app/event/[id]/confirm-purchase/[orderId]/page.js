import ConfirmPurchaseClient from "./page-client";

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
  const { orderItems } = await getOrder(params.orderId);

  return (
    <>
      <ConfirmPurchaseClient orderItems={orderItems} />
    </>
  );
}
