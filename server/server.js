import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import "./config/instrument.js";
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from "./controllers/webhooks.js";
import companyRoutes from "./routes/companyRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { clerkMiddleware } from "@clerk/express";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";

//initialize express app
const app = express();

//connect to database

await connectDB();
//middleware
await connectCloudinary();
app.use(
  cors({
    origin: "https://job-portal-czi.pages.dev/", // or "*" during development
    credentials: true, // if using cookies or authorization headers
  })
);
app.use(express.json());
app.use(clerkMiddleware());

//Routes
app.get("/", (req, res) => {
  res.send("let there be light!");
});

app.post("/webhooks", clerkWebhooks);

app.use("/api/company", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);
app.use("/api/subscribe", subscriptionRoutes);
//Port
const PORT = process.env.PORT || 5000;
Sentry.setupExpressErrorHandler(app);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
