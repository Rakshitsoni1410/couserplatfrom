import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";
import { v4 as uuidv4 } from "uuid"; // For generating unique payment IDs

// Create a checkout session (store payment in DB)
export const storePayment = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId, paymentMethod, upiId, cardNumber } = req.body;

    // ✅ Validate courseId
    if (!courseId || typeof courseId !== "string" || courseId.length !== 24) {
      return res.status(400).json({ message: "Invalid courseId!" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }

    // Proceed with payment logic...
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Get course details along with purchase status
export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    console.log("🔍 Debug - Received Params:", req.params);
    const { courseId } = req.params;
    const userId = req.id;

    if (!courseId || courseId.length !== 24) {
      return res.status(400).json({ message: "Invalid Course ID!" });
    }

    // ✅ Fetch course details and populate subtitle, creator name, and email
    const course = await Course.findById(courseId)
      .populate("creator", "name email") // Ensure creator's name is included
      .select("courseTitle subtitle creator createdAt enrolledStudents lectures coursePrice description");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // ✅ Check if user has purchased the course
    const purchased = await CoursePurchase.findOne({ userId, courseId });

    return res.status(200).json({
      success: true,
      course,
      purchased: !!purchased, // Convert to boolean
    });
  } catch (error) {
    console.error("🚨 Error in getCourseDetailWithPurchaseStatus:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// ✅ Get all purchased courses for a user
export const getAllPurchasedCourses = async (req, res) => {
  try {
    const userId = req.id; // Get the logged-in user's ID

    // Find all purchases made by the user
    const purchases = await CoursePurchase.find({ userId }).populate("courseId");

    if (!purchases.length) {
      return res.status(404).json({ message: "No purchased courses found!" });
    }

    // Extract course details
    const purchasedCourses = purchases.map((purchase) => ({
      courseId: purchase.courseId._id,
      courseName: purchase.courseId.courseName,
      coursePrice: purchase.amount,
      paymentStatus: purchase.status,
      paymentMethod: purchase.paymentMethod,
      paymentId: purchase.paymentId,
    }));

    return res.status(200).json({ success: true, courses: purchasedCourses });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
