import express from "express";

const app = express();
const port = process.env.PROT || 3000;

app.listen(port, () => console.log(`Running on port ${port}`));
