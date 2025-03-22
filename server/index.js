import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './database/db.js';
import userRoute from './routes/user.route.js';
import cors from 'cors';
import courseRoute from './routes/course.route.js';
import mediaRoute from './routes/media.route.js';
import purchaseRoute from './routes/purchaseCourse.route.js';

dotenv.config();

console.log("Connecting to Database...");
connectDB()
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Connection Error:", err));

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Use express.raw() ONLY for webhook route BEFORE json parser
app.use("/api/v1/purchase/webhook", express.raw({ type: "application/json" }));

// ✅ Then apply other global middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// ✅ API Routes
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
