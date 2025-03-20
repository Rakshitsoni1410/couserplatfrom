import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { 
    createCheckoutSession, 
    getAllPurchasedCourse, 
    getCourseDetailWithPurchaseStatus, 
    paymentWebhook 
} from "../controllers/coursePurchase.controller.js";

const router = express.Router();

// ✅ Add the missing `/storePayment` route
router.route("/storePayment").post(isAuthenticated, createCheckoutSession);

// Payment Routes
router.route("/checkout/create-checkout-session").post(isAuthenticated, createCheckoutSession);
router.route("/webhook").post(express.raw({ type: "application/json" }), paymentWebhook);

// Course Details
router.route("/course/:courseId/detail-with-status").get(getCourseDetailWithPurchaseStatus);

// General Route (Fetch all purchased courses)
router.route("/").get(isAuthenticated, getAllPurchasedCourse);

export default router;
