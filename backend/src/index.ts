import express, { raw } from "express";

import { createCheckout } from "./handler/checkout";
import { createWebhook } from "./handler/webhook";

// App
const app = express();

app.post("/checkout", createCheckout);
app.post("/webhook", raw({ type: "application/json" }), createWebhook);

// Main
const port = process.env.PROT || 3000;
app.listen(port, () => console.log(`Running on port ${port}`));
