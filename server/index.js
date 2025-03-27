import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './database/db.js';
import userRoute from './routes/user.route.js';
import cors from 'cors';
import courseRoute from './routes/course.route.js';
import mediaRoute from './routes/media.route.js';
import purchaseRoute from './routes/purchaseCourse.route.js';
import { paymentWebhook } from './controllers/coursePurchase.controller.js'; // ✅ Import controller directly
import  courseProgressRoute from './routes/courseProgress.route.js';
import reviewRoute from './routes/review.route.js';
dotenv.config();

console.log("Connecting to Database...");
connectDB()
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Connection Error:", err));

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Apply CORS before any route
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// ✅ Handle preflight requests
app.options("*", cors());

// ✅ Webhook route - must come AFTER cors, but BEFORE express.json()
app.post("/api/v1/purchase/webhook", express.raw({ type: "application/json" }), paymentWebhook);

// ✅ Global middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ API Routes
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute); // NOTE: /webhook already handled separately
app.use("/api/v1/progress", courseProgressRoute); 
app.use("/api/v1/review", reviewRoute); // ✅ Use the review route
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
