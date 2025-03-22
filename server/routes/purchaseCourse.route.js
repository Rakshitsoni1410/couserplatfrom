import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { 
    createCheckoutSession, 
    getAllPurchasedCourse, 
    getCourseDetailWithPurchaseStatus, 
    paymentWebhook 
} from "../controllers/coursePurchase.controller.js";

const router = express.Router();

// purchase.routes.js
router.use(express.json()); // unless you're handling it globally

router.post("/checkout/create-checkout-session", isAuthenticated, createCheckoutSession);
router.post("/webhook", express.raw({ type: "application/json" }), paymentWebhook);
router.get("/course/:courseId/detail-with-status", getCourseDetailWithPurchaseStatus);
router.get("/", isAuthenticated, getAllPurchasedCourse);

export default router;
