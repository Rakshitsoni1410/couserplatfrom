import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js"; // Removed parentheses
import { createCheckoutSession, getAllPurchasedCourse, getCourseDetailWithPurchaseStatus, paymentWebhook } from "../controllers/coursePurchase.controller.js";

const router = express.Router();

// Payment Routes
router.route("/checkout/create-checkout-session").post(isAuthenticated, createCheckoutSession);
router.route("/webhook").post(express.raw({ type: "application/json" }), paymentWebhook); // Added missing "/"

// Course Details
router.route("/course/:courseId/detail-with-status").get(getCourseDetailWithPurchaseStatus); // This route has no handler yet

// General Route (Make sure to define what this should return)
router.route("/").get(isAuthenticated,getAllPurchasedCourse); // This also has no handler yet

export default router;
