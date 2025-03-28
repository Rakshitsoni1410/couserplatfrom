import express from "express";
import {
  createReview,
  getCourseReviews,
  instructorReplyToReview,
} from "../controllers/review.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// ✅ Student submits a review (requires authentication)
router.post("/", isAuthenticated, createReview); // POST /api/v1/review

// ✅ Get all reviews for a specific course
router.get("/:courseId", getCourseReviews); // GET /api/v1/review/:courseId

// ✅ Instructor replies to a specific review (requires authentication)
router.put("/reply/:reviewId", isAuthenticated, instructorReplyToReview); // PUT /api/v1/review/reply/:reviewId

export default router;
