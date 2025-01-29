import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import connectDB from './database/db.js';
import userRoute from './routes/user.route.js';

dotenv.config();

// Call data connection here
connectDB();

const app = express();

const PORT = process.env.PORT || 8008;
// default middleware
app.use(express.json());
app.use(cookieParser());
app.use({
    origin:"http://localhost:8008"
})
// API routes
app.use("/api/v1/user", userRoute);

"http://localhost:8008/api/v1/user/register"
 // Corrected the placement of the closing brace here

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});