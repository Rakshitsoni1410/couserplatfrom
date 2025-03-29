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

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid course ID." });
    }

    const existingReview = await Review.findOne({ course: courseId, student: userId });
    if (existingReview) {
      return res.status(400).json({ message: "You already reviewed this course." });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

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
      .populate("student", "name photoUrl")
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

    if (!reply) {
      return res.status(400).json({ success: false, message: "Reply is required." });
    }

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found." });
    }

    // ✅ Check if the instructor owns the course
    const course = await Course.findById(review.course);
    if (!course || course.instructor.toString() !== req.id) {
      return res.status(403).json({ success: false, message: "Not authorized to reply." });
    }

    // ✅ Update the review with the reply
    review.reply = reply;
    await review.save();

    res.status(200).json({ success: true, message: "Reply added successfully", review });
  } catch (error) {
    console.error("❌ instructorReplyToReview error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * ✅ Get all reviews for all courses created by this instructor
 */
export const getInstructorReviews = async (req, res) => {
  try {
    const instructorId = req.id; // ✅ This must be available
    const { courseId } = req.query;

    const query = { instructor: instructorId };
    if (courseId) {
      query.course = courseId;
    }

    const reviews = await Review.find(query)
      .populate("student", "name")
      .populate("course", "title");

    res.status(200).json({ success: true, reviews });
  } catch (error) {
    console.error("❌ getInstructorReviews error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch reviews." });
  }
};
// Edit Review
export const updateReview = async (req, res) => {
  const { reviewId } = req.params;
  const { rating, comment } = req.body;
  const review = await Review.findById(reviewId);

  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }

  if (review.student.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  review.rating = rating || review.rating;
  review.comment = comment || review.comment;

  await review.save();
  res.status(200).json({ success: true, message: "Review updated successfully", review });
};

// Delete Review
export const deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  const review = await Review.findById(reviewId);

  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }

  if (review.student.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  await review.deleteOne();
  res.status(200).json({ success: true, message: "Review deleted successfully" });
};
