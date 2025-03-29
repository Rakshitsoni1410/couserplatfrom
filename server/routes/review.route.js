import express from "express";
import {
  createReview,
  deleteReview,
  getCourseReviews,
  getInstructorReviews,
  instructorReplyToReview,
  updateReview,
} from "../controllers/review.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

/**
 * ✅ Student submits a review
 * POST /api/v1/review
 */
router.route("/").post(isAuthenticated, createReview);

/**
 * ✅ Instructor gets all their course reviews
 * GET /api/v1/review/instructor-reviews?courseId=optional
 */
router.route("/instructor-reviews").get(isAuthenticated, getInstructorReviews);

/**
 * ✅ Get all reviews for a specific course
 * GET /api/v1/review/:courseId
 */
router.route("/:courseId").get(getCourseReviews);

/**
 * ✅ Instructor replies to a review
 * PUT /api/v1/review/reply/:reviewId
 */
router.route("/reply/:reviewId").put(isAuthenticated, instructorReplyToReview);

/**
 * ✅ Student edits their own review
 * PUT /api/v1/review/:reviewId
 */
router.route("/:reviewId").put(isAuthenticated, updateReview);

/**
 * ✅ Student deletes their own review
 * DELETE /api/v1/review/:reviewId
 */
router.route("/:reviewId").delete(isAuthenticated, deleteReview);

export default router;
