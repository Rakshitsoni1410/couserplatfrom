import express from 'express';
import { login, register } from '../controllers/user.controller.js'; // Changed "../controllers/user.controller.js" to "../controllers/user.controller.js"

const router = express.Router();

router.route("/register").post(register); // Changed "/registert" to "/register"
router.route("/login").post(login);
export default router;