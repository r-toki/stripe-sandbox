import express, { raw } from "express";
import { stripe } from "./stripe";
import { assertIsDefined } from "./lib/assert-is-defined";
import { unwrapEnv } from "./lib/env";
import Stripe from "stripe";

// Env
const port = process.env.PROT || 3000;
const stripeCheckoutRedirectUrl = unwrapEnv("STRIPE_CHECKOUT_REDIRECT_URL");
const stripeWebhookSecretKey = unwrapEnv("STRIPE_WEBHOOK_SECRET_KEY");

// App
const app = express();

app.post("/checkout", async (_req, res) => {
  const customer = await stripe.customers.create();
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "setup",
    customer: customer.id,
    success_url: `${stripeCheckoutRedirectUrl}?success=true`,
    cancel_url: `${stripeCheckoutRedirectUrl}?canceled=true`,
  });

  assertIsDefined(session.url);
  res.redirect(303, session.url);
});

app.post("/webhook", raw({ type: "application/json" }), async (req, res) => {
  let event = req.body as Stripe.Event;

  try {
    const signature = req.headers["stripe-signature"];
    assertIsDefined(signature);
    event = stripe.webhooks.constructEvent(req.body, signature, stripeWebhookSecretKey);
  } catch (err) {
    console.log(`Webhook signature verification failed.`, err);
    return res.sendStatus(400);
  }

  switch (event.type) {
    default:
      console.log(`Unhandled event type ${event.type}.`);
  }

  res.send();
});

// Start
app.listen(port, () => console.log(`Running on port ${port}`));
