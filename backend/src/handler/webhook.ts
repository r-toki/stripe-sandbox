import { Request, Response } from "express";
import Stripe from "stripe";

import { assertIsDefined } from "../lib/assert-is-defined";
import { catchAsync } from "../lib/catch-async";
import { getEnv } from "../lib/env";
import { logger } from "../lib/logger";
import { stripe } from "../lib/stripe";

export const createWebhook = catchAsync(async (req: Request, res: Response) => {
  let event: Stripe.Event;

  try {
    event = extractEvent(req);
  } catch (e) {
    logger.error("Webhook signature verification failed.");
    logger.error(e);
    res.sendStatus(400);
    return;
  }

  switch (event.type) {
    default:
      logger.info(`Unhandled event type ${event.type}.`);
  }

  res.send();
});

const extractEvent = (req: Request): Stripe.Event => {
  const signature = req.headers["stripe-signature"];
  assertIsDefined(signature);
  const stripeWebhookSecretKey = getEnv("STRIPE_WEBHOOK_SECRET_KEY");

  const event = stripe.webhooks.constructEvent(req.body, signature, stripeWebhookSecretKey);
  return event;
};
