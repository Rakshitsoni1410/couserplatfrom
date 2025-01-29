import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/db.js';
import userRoute from './routes/user.route.js';

dotenv.config();

// Call data connection here
connectDB();

const app = express();

const PORT = process.env.PORT || 8008;

// API routes
app.use("/api/v1/user", userRoute);

"http://localhost:8008/"
app.get("/home", (_, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to backend"
    });
}); // Corrected the placement of the closing brace here

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});