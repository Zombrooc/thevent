import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2020-03-02",
  httpClient: Stripe.createFetchHttpClient(),
});

export const createStripeProduct = async (ticketName, ticketPrice) => {
  const product = await stripe.products.create({
    name: ticketName,
    default_price_data: {
      unit_amount: Math.round(ticketPrice * 100),
      currency: "BRL",
    },
    expand: ["default_price"],
  });
  return product.id;
};

export const getStripeCustomerByEmail = async (email) => {
  const customers = await stripe.customers.list({ email });
  return customers.data[0];
};

export const createStripeCustomer = async (email, fullName) => {
  const customer = await getStripeCustomerByEmail(email);
  if (customer) return customer;

  const createdCustomer = await stripe.customers.create({
    email: email,
    name: fullName,
  });

  return createdCustomer;
};
