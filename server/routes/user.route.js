import express from 'express';
import { register } from '../controllers/user.controller.js';

const router = express.Router();

router.route("/registert").post(register);
 
export default router;