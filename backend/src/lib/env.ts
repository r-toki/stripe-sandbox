import { assertIsDefined } from "./assert-is-defined";

type Key = "STRIPE_SECRET_KEY" | "STRIPE_WEBHOOK_SECRET_KEY" | "STRIPE_CHECKOUT_REDIRECT_URL";

export const getEnv = (key: Key) => {
  const value = process.env[key];
  assertIsDefined(value);
  return value;
};

export const getEnvSafely = (key: Key) => {
  const value = process.env[key];
  return value;
};
