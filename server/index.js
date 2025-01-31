import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './database/db.js';
import userRoute from './routes/user.route.js';


import cors from 'cors';

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
    origin: "http://http://localhost:5173/", // Ensure this matches the port your frontend is running on
    credentials: true,
}));



app.use("/api/v1/user", userRoute); // This will handle all /api/v1/user routes

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
