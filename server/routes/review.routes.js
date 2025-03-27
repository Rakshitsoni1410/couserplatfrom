import express from "express";
import {
  createReview,
  getCourseReviews,
  instructorReplyToReview,
} from "../controllers/review.controller.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// ✅ Student submits a review
router.post("/review", isAuthenticated, createReview);

// ✅ Fetch all reviews for a course (for instructor or students)
router.get("/review/:courseId", getCourseReviews);

// ✅ Instructor replies to a review
router.put("/review/reply/:reviewId", isAuthenticated, instructorReplyToReview);

export default router;