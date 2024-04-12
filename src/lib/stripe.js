import Stripe from "stripe";

import { prisma } from "./database";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
  httpClient: Stripe.createFetchHttpClient(),
});

export const createStripeProduct = async (ticketName, ticketPrice) => {
  const product = await stripe.products.create({
    name: ticketName,
    default_price_data: {
      unit_amount: ticketPrice,
      currency: "BRL",
    },
    expand: ["default_price"],
  });
  return product.id;
};
