import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { 
  getAllPurchasedCourses, 
  getCourseDetailWithPurchaseStatus, 
  storePayment 
} from "../controllers/coursePurchase.controller.js";

const router = express.Router();

// ✅ Store Payment in Database
router.post("/store", isAuthenticated, storePayment);

// ✅ Get Course Details with Purchase Status
router.get("/course/:courseId", isAuthenticated, getCourseDetailWithPurchaseStatus);

// ✅ Get All Purchased Courses
router.get("/all", isAuthenticated, getAllPurchasedCourses);

// ❌ Remove this if it's redundant, otherwise clarify its purpose
router.post("/checkout/create-payment-session", isAuthenticated, storePayment);

export default router;
