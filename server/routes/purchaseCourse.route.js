import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { 
    createCheckoutSession, 
    getAllPurchasedCourse, 
    getCourseDetailWithPurchaseStatus, 
    paymentWebhook 
} from "../controllers/coursePurchase.controller.js";

const router = express.Router();

// ✅ Initiate checkout session (creates pending payment)
router.route("/checkout/create-checkout-session").post(isAuthenticated, createCheckoutSession);

// ✅ Webhook endpoint to confirm payment and complete enrollment
router.route("/webhook").post(express.raw({ type: "application/json" }), paymentWebhook);

// ✅ Get course detail with user purchase status
router.route("/course/:courseId/detail-with-status").get(getCourseDetailWithPurchaseStatus);

// ✅ Get all courses purchased by the logged-in user
router.route("/").get(isAuthenticated, getAllPurchasedCourse);

export default router;
