import { Request, Response } from "express";

import { assertIsDefined } from "../lib/assert-is-defined";
import { catchAsync } from "../lib/catch-async";
import { getEnv } from "../lib/env";
import { stripe } from "../lib/stripe";

export const createCheckout = catchAsync(async (_req: Request, res: Response) => {
  const stripeCheckoutRedirectUrl = getEnv("STRIPE_CHECKOUT_REDIRECT_URL");

  // TODO: Firebase Authentication を使うのなら JWT から uid を取得して findOrCreate する
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
