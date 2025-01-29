import express from 'express';
import { login, register } from '../controllers/user.controller.js'; // Ensure this path is correct

const router = express.Router();

// POST request for user registration
router.route("/register").post(register); 

// POST request for user login
router.route("/login").post(login);

export default router;
