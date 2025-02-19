import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './database/db.js';
import userRoute from './routes/user.route.js';
import cors from 'cors';
import courseRoute from './routes/course.route.js';
dotenv.config();

console.log("Connecting to Database...");
connectDB()
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("DB Connection Error:", err));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", // Removed extra "http://"
    credentials: true,
}));
//api 
app.use("/api/v1/user", userRoute); // This will handle all /api/v1/user routes
app.use("/api/v1/course", courseRoute);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
