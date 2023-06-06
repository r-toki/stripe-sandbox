import Stripe from "stripe";

import { getEnv } from "./env";

export const stripe = new Stripe(getEnv("STRIPE_SECRET_KEY"), { apiVersion: "2022-11-15" });
