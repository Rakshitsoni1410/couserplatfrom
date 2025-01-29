import express from 'express';
import { login, register } from '../controllers/user.controller.js';

const router = express.Router();

router.route("/register").post(register); // Fixed typo in route
router.route("/login").post(login);

export default router;
