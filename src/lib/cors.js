const allowCorsForStripeCheckout = (handler) => async (req, res) => {
  const stripeCheckoutUrl = "https://checkout.stripe.com";
  const origin = req.headers.origin;
  if (origin === stripeCheckoutUrl) {
    res.setHeader("Access-Control-Allow-Origin", stripeCheckoutUrl);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
  }
  return handler(req, res);
};

module.exports = { allowCorsForStripeCheckout };
