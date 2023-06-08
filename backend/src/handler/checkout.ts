import { assertIsDefined } from "../lib/assert-is-defined";
import { catchAsync } from "../lib/catch-async";
import { getEnv } from "../lib/env";
import { stripe } from "../lib/stripe";

const redirectUrl = getEnv("STRIPE_CHECKOUT_REDIRECT_URL");

export const createCheckoutSetup = catchAsync(async (req, res) => {
  // TODO: JWT から uid を取得し、db に customers を問い合わせ。それをもとに findOrCreate をする
  const customer = await stripe.customers.create();
  // const customer = await stripe.customers.retrieve("TODO");

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "setup",
    customer: customer.id,
    success_url: `${redirectUrl}?success=true`,
    cancel_url: `${redirectUrl}?canceled=true`,
  });

  assertIsDefined(session.url);
  res.redirect(303, session.url);
});
