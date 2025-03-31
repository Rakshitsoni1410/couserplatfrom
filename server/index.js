import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './database/db.js';
import userRoute from './routes/user.route.js';
import cors from 'cors';
import courseRoute from './routes/course.route.js';
import mediaRoute from './routes/media.route.js';
import purchaseRoute from './routes/purchaseCourse.route.js';
import { paymentWebhook } from './controllers/coursePurchase.controller.js';
import courseProgressRoute from './routes/courseProgress.route.js';
import reviewRoute from './routes/review.route.js';

// Load environment variables from .env
dotenv.config();

// Database connection
console.log("Connecting to Database...");
connectDB()
  .then(() => console.log(" MongoDB Connected"))
  .catch((err) => console.log(" DB Connection Error:", err));

const app = express();
const PORT = process.env.PORT || 3000;

// CORS Configuration
app.use(cors({
  origin: [
    "http://localhost:5173",                    // for local dev
    "https://nextskills.netlify.app",           // deployed frontend domain
  ],
  credentials: true,
}));

// Handle preflight requests
app.options("*", cors());

// Stripe or custom webhook: MUST come before express.json
app.post("/api/v1/purchase/webhook", express.raw({ type: "application/json" }), paymentWebhook);

// Global Middlewares
app.use(express.json()); // Must come after the raw body parser for the webhook
app.use(cookieParser());

// API Routes
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute); // /webhook is handled separately above
app.use("/api/v1/progress", courseProgressRoute);
app.use("/api/v1/review", reviewRoute);

// Default route for backend root
app.get("/", (req, res) => {
  res.send("Backend is running successfully! 🚀");
});

// Start the server
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
