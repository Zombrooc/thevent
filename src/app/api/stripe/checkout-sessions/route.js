import { redirect } from "next/navigation";
import { headers } from "next/headers";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const tickets = await req.json();

  const headersList = headers();
  const origin = headersList.get("origin");

  if (!tickets || tickets.length === 0) {
    return new Response("Nenhum ingresso fornecido.", {
      status: 400,
    });
  }

  const ticketData = await Promise.all(
    tickets.map(async (ticket) => {
      const productData = await stripe.products.retrieve(ticket.stripeID);

      return { price: productData.default_price, quantity: ticket.quantity };
    })
  );

  let session;

  try {
    // Create Checkout Sessions from body params.
    session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "boleto"],
      payment_method_options: {
        boleto: {
          expires_after_days: 3,
        },
      },
      line_items: ticketData,
      mode: "payment",
      success_url: `${origin}/return?success=true`,
      cancel_url: `${origin}/return?canceled=true`,
    });
  } catch (err) {
    console.log(err.message);
    return new Response(err.message, {
      status: err.statusCode || 500,
    });
  }
  return Response.json({ ...session });
}
