import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './database/db.js';
import userRoute from './routes/user.route.js';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:8008", // Update this if needed
    credentials: true,
}));

app.use("/api/v1/user", userRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});