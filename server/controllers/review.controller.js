import Review from "../models/review.model.js";
import Course from "../models/course.model.js";

// ✅ Create a new review
export const createReview = async (req, res) => {
  try {
    const { courseId, rating, comment } = req.body;

    // Prevent duplicate reviews by same user
    const existingReview = await Review.findOne({
      course: courseId,
      user: req.user._id,
    });

    if (existingReview) {
      return res.status(400).json({ message: "You already reviewed this course." });
    }

    const review = await Review.create({
      course: courseId,
      user: req.user._id,
      rating,
      comment,
    });

    res.status(201).json({ success: true, message: "Review submitted", review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get all reviews for a course
export const getCourseReviews = async (req, res) => {
  try {
    const { courseId } = req.params;

    const reviews = await Review.find({ course: courseId })
      .populate("user", "name photoUrl") // show student's name and photo
      .populate("course", "title");

    res.status(200).json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Instructor replies to a review
export const instructorReplyToReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { reply } = req.body;

    const review = await Review.findById(reviewId).populate("course");

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Optional: Check if logged in user is the instructor of the course
    if (String(review.course.instructor) !== String(req.user._id)) {
      return res.status(403).json({ message: "You are not allowed to reply to this review" });
    }

    review.instructorReply = reply;
    await review.save();

    res.status(200).json({ success: true, message: "Reply added", review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
