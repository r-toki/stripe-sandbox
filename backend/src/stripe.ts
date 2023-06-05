import Stripe from "stripe";
import { unwrapEnv } from "./lib/env";

export const stripe = new Stripe(unwrapEnv("STRIPE_SECRET_KEY"), { apiVersion: "2022-11-15" });
