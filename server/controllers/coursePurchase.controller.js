import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";
import { v4 as uuidv4 } from "uuid"; // For generating unique payment IDs

// Create a checkout session (store payment in DB)
export const storePayment = async (req, res) => {
  try {
    console.log("🔍 Debug: storePayment received", req.body); // Debug log

    const userId = req.id;
    const { courseId, paymentMethod, upiId, cardNumber } = req.body;

    console.log("📌 Received courseId:", courseId); // Debugging

    // ✅ Validate courseId
    if (!courseId || typeof courseId !== "string" || courseId.length !== 24) {
      console.error("🚨 Error: Invalid courseId received:", courseId);
      return res.status(400).json({ message: "Invalid courseId!" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      console.error("🚨 Error: Course not found!", courseId);
      return res.status(404).json({ message: "Course not found!" });
    }

    console.log("✅ Debug: Found Course:", course);

    // Proceed with payment logic...
  } catch (error) {
    console.error("🚨 Error in storePayment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Get course details along with purchase status
export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    console.log("🔍 Debug - Received Params:", req.params); // Debugging
    const { courseId } = req.params;

    if (!courseId || courseId.length !== 24) {
      return res.status(400).json({ message: "Invalid Course ID!" });
    }

    // Fetch the course details
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    res.status(200).json({ success: true, course });
  } catch (error) {
    console.error("🚨 Error in getCourseDetailWithPurchaseStatus:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// ✅ Get all purchased courses for a user
export const getAllPurchasedCourses = async (req, res) => {
  try {
    console.log("🔍 Debug: Fetching all purchased courses for user", req.id);

    const userId = req.id; // Get the logged-in user's ID

    // Find all purchases made by the user
    const purchases = await CoursePurchase.find({ userId }).populate("courseId");

    if (!purchases.length) {
      console.log("🚨 Debug: No purchased courses found!");
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
    console.error("🚨 Error fetching purchased courses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
