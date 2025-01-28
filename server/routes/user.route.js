import express from 'express';
//import { register } from '../controllers/user.controller.js';im
import { register } from '../controllers/user.controller.js'; // Changed "../controllers/user.controller.js" to "../controllers/user.controller.js"

const router = express.Router();

router.route("/register").post(register); // Changed "/registert" to "/register"
 
export default router;