"use server";

import { redirect } from "next/navigation";

export const confirmPurchaseAndRedirectToCheckout = async ({
  userAnswers,
  orderId,
  orderItems,
}) => {
  console.log("User Answers: ", userAnswers);
  console.log("Order Items: ", orderItems);
  console.log("Order ID: ", orderId);

  const userAnswersResponse = await fetch(`/api/userAnswers`, {
    body: JSON.stringify({
      userAnswers: data,
      orderItems,
    }),
    method: "PATCH",
  });

  if (userAnswersResponse.status === 422) {
    console.error("Missing Arguments");

    return {
      error: {
        status: 422,
        message: "Missing Arguments",
      },
    };
  }
  const { done } = await userAnswersResponse.json();

  if (done) {
    const stripeCheckoutSessionResponse = await fetch(
      `/api/stripe/checkout-sessions`,
      {
        method: "POST",
        body: JSON.stringify({ orderId }),
      }
    );

    if (
      stripeCheckoutSessionResponse.status === 401 &&
      stripeCheckoutSessionResponse.statusText === "Unauthorized"
    ) {
      redirect("/api/auth/login");
    } else {
      stripeCheckoutSessionResponse
        .json()
        .then(({ url }) => {
          redirect(url);
        })
        .catch((err) => {
          console.error("Erro ao obter URL de checkout", err);
        });
    }
  }

  return {
    error: {
      status: 500,
      message: "Something wrong.",
    },
  };
};
