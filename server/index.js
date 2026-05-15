import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./database/db.js";

import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";
import reviewRoute from "./routes/review.route.js";

import { paymentWebhook } from "./controllers/coursePurchase.controller.js";

// Load environment variables
dotenv.config();

// Connect Database
console.log("Connecting to MongoDB...");

connectDB()
  .then(() => console.log(" MongoDB Connected Successfully"))
  .catch((err) => console.log(" MongoDB Connection Error:", err));

const app = express();

// Trust proxy for Render deployment
app.set("trust proxy", 1);

// PORT
const PORT = process.env.PORT || 8080;

// ======================
// CORS Configuration
// ======================

const allowedOrigins = [
  "http://localhost:5173",
  "https://nextskills.netlify.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (postman/mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS Not Allowed"));
      }
    },
    credentials: true,
  })
);

// Handle preflight requests
app.options("*", cors());

// ======================
// Stripe Webhook
// MUST be before express.json()
// ======================

app.post(
  "/api/v1/purchase/webhook",
  express.raw({ type: "application/json" }),
  paymentWebhook
);

// ======================
// Global Middlewares
// ======================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ======================
// API Routes
// ======================

app.use("/api/v1/user", userRoute);

app.use("/api/v1/course", courseRoute);

app.use("/api/v1/media", mediaRoute);

app.use("/api/v1/purchase", purchaseRoute);

app.use("/api/v1/progress", courseProgressRoute);

app.use("/api/v1/review", reviewRoute);

// ======================
// Default Route
// ======================

app.get("/", (req, res) => {
  res.status(200).send("Backend is running successfully! 🚀");
});

// ======================
// 404 Route
// ======================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ======================
// Global Error Handler
// ======================

app.use((err, req, res, next) => {
  console.error(" Server Error:", err.message);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ======================
// Start Server
// ======================

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});