import { logger } from "../src/lib/logger";
import { stripe } from "../src/lib/stripe";

/**
 * Helpers
 */

/**
 * Query Helpers
 */
const listAll = async () => {
  const customers = await stripe.customers.list();
  logger.info("Customers.");
  logger.info(customers);

  const setupIntents = await stripe.setupIntents.list();
  logger.info("Setup Intents.");
  logger.info(setupIntents);

  const paymentMethods = await Promise.all(customers.data.map((cus) => stripe.customers.listPaymentMethods(cus.id)));
  logger.info("Payment Methods.");
  logger.info(paymentMethods);

  const paymentIntents = await stripe.paymentIntents.list();
  logger.info("Payment Intents.");
  logger.info(paymentIntents);
};

const listPaymentIntents = async () => {
  const paymentIntents = await stripe.paymentIntents.list();
  logger.info("Payment Intents.");
  logger.info(paymentIntents);
};

/**
 * Mutation Helpers
 */
type CreatePaymentIntent = {
  amount: number;
  currency: string;
  customer: string;
  payment_method: string;
};

const createPaymentIntent = async (input: CreatePaymentIntent) => {
  return stripe.paymentIntents.create({
    amount: input.amount,
    currency: input.currency,
    customer: input.customer,
    payment_method: input.payment_method,
  });
};

const confirmPaymentIntent = async (paymentIntentId: string) => {
  return stripe.paymentIntents.confirm(paymentIntentId);
};

type CreateAndConfirmPaymentIntent = {
  amount: number;
  currency: string;
  customer: string;
  payment_method: string;
};

const createAndConfirmPaymentIntent = async (input: CreateAndConfirmPaymentIntent) => {
  return stripe.paymentIntents.create({
    amount: input.amount,
    currency: input.currency,
    customer: input.customer,
    payment_method: input.payment_method,
    confirm: true,
  });
};

/**
 * Constants
 */
const USER_1 = "cus_O1vve03J8z3tX7";
const USER_1_PAYMENT_METHOD_1 = "pm_1NFs4TIDDUiR4OJzQ49fcwWp";

/**
 * Main
 */
const main = async () => {
  // await createPaymentIntent({
  //   amount: 1_000,
  //   currency: "jpy",
  //   customer: USER_1,
  //   payment_method: USER_1_PAYMENT_METHOD_1,
  // });
  // await confirmPaymentIntent("TODO");
  // await createAndConfirmPaymentIntent({
  //   amount: 1_000,
  //   currency: "jpy",
  //   customer: USER_1,
  //   payment_method: USER_1_PAYMENT_METHOD_1,
  // });
  // await listAll();
  // await listPaymentIntents()
};

main().catch((e) => logger.error(e));
