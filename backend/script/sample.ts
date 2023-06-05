import { logger } from "../src/lib/logger";
import { stripe } from "../src/lib/stripe";

(async () => {
  const customers = await stripe.customers.list();
  logger.info(`List Customers.`);
  logger.info(customers);
})();
