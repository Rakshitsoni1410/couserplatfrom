import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { 
    createCheckoutSession, 
    fakePaymentWebhook, 
    getCourseDetailWithPurchaseStatus, 
    getAllPurchasedCourses 
} from "../controllers/coursePurchase.controller.js";

const router = express.Router();

// Fake Payment Checkout
router.route("/checkout/create-checkout-session").post(isAuthenticated, createCheckoutSession);

// Fake Webhook (Simulating Payment Confirmation)
router.route("/webhook").post(fakePaymentWebhook);

// Get Course Details with Purchase Status
router.route("/course/:courseId").get(isAuthenticated, getCourseDetailWithPurchaseStatus);

// Get All Purchased Courses
router.route("/all").get(isAuthenticated, getAllPurchasedCourses);

export default router;
