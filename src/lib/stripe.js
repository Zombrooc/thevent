import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-04-10",
  httpClient: Stripe.createFetchHttpClient(),
});

export const normalizeStripePrice = (price) => {
  return price / 100;
};

export const createStripeProduct = async (
  ticketName,
  ticketPrice,
  ticketSubTotalPrice,
  ticketDefaultAvailableStock,
  ticketID
) => {
  const { id } = await stripe.products.create({
    id: ticketID,
    name: ticketName,
    default_price_data: {
      unit_amount: Math.round(ticketPrice * 100),
      currency: "BRL",
    },
    metadata: {
      ticketSubTotalPrice: Math.round(ticketSubTotalPrice * 100),
      ticketDefaultAvailableStock,
    },
    expand: ["default_price"],
  });
  return id;
};

export const getStripeCustomerByEmail = async (email) => {
  const customers = await stripe.customers.list({ email });
  return customers.data[0];
};

export const createStripeCustomer = async (email, fullName) => {
  const customer = await getStripeCustomerByEmail(email);
  if (customer) {
    return customer;
  }

  const createdCustomer = await stripe.customers.create({
    email: email,
    name: fullName,
  });

  return createdCustomer;
};

export const getPaymentIntnet = async (paymentIntnet) => {
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntnet);
  return paymentIntent;
};

export const getStripeProduct = async (stripeProductId) => {
  const productDetails = await stripe.products.retrieve(stripeProductId);

  return productDetails;
};

export const getStripeProductsByIDArrays = async (stripeProductIDs) => {
  const { data: retrievedData } = await stripe.products.list({
    ids: stripeProductIDs,
  });

  const productList = await Promise.all(
    retrievedData.map(async ({ name: ticketName, default_price, metadata }) => {
      const { unit_amount: ticketPrice } =
        await stripe.prices.retrieve(default_price);

      return {
        ticketName,
        ticketPrice,
        ...metadata,
      };
    })
  );

  return productList;
};
// export const createStripeAccount = async (email, fullName) => {

// const account = await stripe.accounts.create({
//   country: 'BR',
//   email,
//   controller: {
//     fees: {
//       payer: 'application',
//     },
//     losses: {
//       payments: 'application',
//     },
//     stripe_dashboard: {
//       type: 'express',
//     },
//   },
// });
// }
