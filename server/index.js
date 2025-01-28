import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/db.js';

dotenv.config();

// Call data connection here
connectDB();

const app = express();
const PORT = process.env.PORT || 8008;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
