import express from "express";
import {
  createReview,
  getCourseReviews,
  instructorReplyToReview,
} from "../controllers/review.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// ✅ Student submits a review
router.route("/review").post(isAuthenticated, createReview);

// ✅ Fetch all reviews for a course (for instructor or students)
router.route("/review/:courseId", ).get(getCourseReviews);

// ✅ Instructor replies to a review
router.route("/review/reply/:reviewId") .put(isAuthenticated, instructorReplyToReview);

export default router;