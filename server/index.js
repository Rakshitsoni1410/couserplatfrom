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

// ======================
// Load Environment Variables
// ======================

dotenv.config();

// ======================
// Initialize Express App
// ======================

const app = express();

// ======================
// Trust Proxy (Render)
// ======================

app.set("trust proxy", 1);

// ======================
// PORT
// ======================

const PORT = process.env.PORT || 8080;

// ======================
// Allowed Origins
// ======================

const allowedOrigins = [
  "http://localhost:5173",
  "https://nextskilss.netlify.app",
];

// ======================
// CORS Middleware
// ======================

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin
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
app.options(
  "*",
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

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
  res.status(200).send("Backend is running successfully 🚀");
});

// ======================
// 404 Handler
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
  console.error("Server Error:", err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ======================
// Start Server Function
// ======================

const startServer = async () => {
  try {
    console.log("Connecting to MongoDB...");

    await connectDB();

    console.log("MongoDB Connected Successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("FULL STARTUP ERROR:");
    console.error(error);

    process.exit(1);
  }
};

// ======================
// Start Application
// ======================

startServer();