import mongoose from "mongoose";
import { Review } from "../models/review.model.js";
import { Course } from "../models/course.model.js";
/**
 * ✅ Create a new review
 */
export const createReview = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId, rating, comment } = req.body;

    // ✅ Validate courseId
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid course ID." });
    }

    // ✅ Prevent duplicate reviews by same student
    const existingReview = await Review.findOne({ course: courseId, student: userId });
    if (existingReview) {
      return res.status(400).json({ message: "You already reviewed this course." });
    }

    // ✅ Fetch course to get instructor
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // ✅ Create review
    const review = await Review.create({
      course: courseId,
      instructor: course.creator,
      student: userId,
      rating,
      comment,
    });

    res.status(201).json({ success: true, message: "Review submitted", review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * ✅ Get all reviews for a specific course
 */
export const getCourseReviews = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid course ID." });
    }

    const reviews = await Review.find({ course: courseId })
      .populate("student", "name photoUrl") // ✅ shows reviewer's name and image
      .populate("course", "title");

    res.status(200).json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * ✅ Instructor replies to a review
 */
export const instructorReplyToReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { reply } = req.body;

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      return res.status(400).json({ message: "Invalid review ID." });
    }

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // ✅ Verify the instructor owns this course
    if (String(review.instructor) !== String(req.user._id)) {
      return res.status(403).json({ message: "You are not allowed to reply to this review" });
    }

    review.reply = reply;
    await review.save();

    res.status(200).json({ success: true, message: "Reply added", review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
