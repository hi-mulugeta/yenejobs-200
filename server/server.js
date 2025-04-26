import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import "./config/instrument.js";
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from "./controllers/webhooks.js";

//initialize express app
const app = express();

//connect to database

await connectDB();
//middleware

app.use(cors());
app.use(express.json());

//Routes
app.get("/", (req, res) => {
  res.send("let there be light!");
});

app.post("/webhooks", clerkWebhooks);
//Port
const PORT = process.env.PORT || 5000;
Sentry.setupExpressErrorHandler(app);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
