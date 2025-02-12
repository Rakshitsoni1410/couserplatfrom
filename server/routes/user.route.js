import express from 'express';
import { getUserProfile, login, register } from '../controllers/user.controller.js'; // Ensure this path is correct
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

// POST request for user registration
router.route("/register").post(register); 

// POST request for user login
router.route("/login").post(login);

// GET request for user profile (protected route)
router.route("/profile").get(isAuthenticated, getUserProfile);

export default router;
