import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";
import { webhookSignatureVerification } from "../utils/paymentWebhook.js"; 

/**
 * Real Payment Processing (Transaction Pending)
 */
export const createCheckoutSession = async (req, res) => {
  try {
      const { id: userId, name: userName } = req.user;  // ✅ Get user details
      const { courseId, paymentMethod, upiId, cardNumber } = req.body;

      // Find the course
      const course = await Course.findById(courseId);
      if (!course) {
          return res.status(404).json({
              success: false,
              message: "Course not found!",
              redirectUrl: `http://localhost:5173/course-detail/${courseId}`,
          });
      }

      // Create pending course purchase
      const newPurchase = new CoursePurchase({
          courseId,
          userId,
          amount: course.coursePrice,
          status: "pending",
          paymentId: `PAY_${Date.now()}`,
          paymentMethod,
          upiId: paymentMethod === "upi" ? upiId : undefined,
          cardNumber: paymentMethod === "card" ? cardNumber : undefined,
      });

      await newPurchase.save();

      return res.status(200).json({
          success: true,
          message: `Payment initialized for ${userName}. Waiting for confirmation!`, // ✅ Show username
          redirectUrl: `http://localhost:5173/course-progress/${courseId}`,
      });
  } catch (error) {
      return res.status(500).json({
          success: false,
          message: "Payment failed. Please try again!",
          redirectUrl: `http://localhost:5173/course-detail/${req.body.courseId}`,
      });
  }
};

export const storePayment = async (req, res) => {
  try {
    const { courseId, userId, amount, paymentMethod, upiId, cardNumber } = req.body;

    if (!courseId || !userId || !amount || !paymentMethod) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Generate a random Payment ID (simulating a real payment gateway)
    const paymentId = "PAY-" + Math.random().toString(36).substr(2, 9).toUpperCase();

    // Create a new payment entry
    const newPayment = await CoursePurchase.create({
      courseId,
      userId,
      amount,
      paymentId,
      paymentMethod,
      upiId,
      cardNumber,
      status: "success", // ✅ Assuming payment is always successful in this fake gateway
    });

    return res.status(201).json({ success: true, message: "Payment successful", data: newPayment });
  } catch (error) {
    console.error("❌ Server Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
/**
 * Webhook to handle payment success and update records
 */
export const paymentWebhook = async (req, res) => {
  try {
    const payload = req.body;

    // Verify the webhook signature using a utility
    const isValidWebhook = webhookSignatureVerification(req);

    if (!isValidWebhook) {
      return res.status(400).send("Invalid Webhook Signature");
    }

    // Assuming event type of 'payment.success'
    const event = payload.event;

    if (event === "payment.success") {
      const paymentData = payload.data;
      const purchase = await CoursePurchase.findOne({
        paymentId: paymentData.paymentId,
      }).populate("courseId");

      if (!purchase) {
        return res.status(404).json({ message: "Purchase not found" });
      }

      // Update the purchase status to completed
      purchase.status = "completed";

      // Make all lectures visible by setting `isPreviewFree` to true
      if (purchase.courseId && purchase.courseId.lectures.length > 0) {
        await Lecture.updateMany(
          { _id: { $in: purchase.courseId.lectures } },
          { $set: { isPreviewFree: true } }
        );
      }
      await purchase.save();

      // Update user's enrolledCourses
      await User.findByIdAndUpdate(
        purchase.userId,
        { $addToSet: { enrolledCourses: purchase.courseId._id } }, // Add course ID to enrolledCourses
        { new: true }
      );

      // Update course to add user ID to enrolledStudents
      await Course.findByIdAndUpdate(
        purchase.courseId._id,
        { $addToSet: { enrolledStudents: purchase.userId } }, // Add user ID to enrolledStudents
        { new: true }
      );

      return res.status(200).json({ success: true, message: "Payment successful and course enrolled!" });
    }

    res.status(400).json({ message: "Invalid event" });
  } catch (error) {
    console.error("Webhook Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Get course details with purchase status
 */
export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId)
      .populate({ path: "creator" })
      .populate({ path: "lectures" });

    const purchased = await CoursePurchase.findOne({ userId, courseId });

    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }

    return res.status(200).json({
      course,
      purchased: !!purchased , // Convert to boolean (true if purchased)
    });
  } catch (error) {
    console.log("Error fetching course details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Get all purchased courses
 */
export const getAllPurchasedCourse = async (req, res) => {
  try {
    const userId = req.user.id; // Ensure fetching for the logged-in user

    const purchasedCourses = await CoursePurchase.find({
      userId,
      status: "completed",
    }).populate("courseId");

    return res.status(200).json({
      purchasedCourses,
    });
  } catch (error) {
    console.log("Error fetching purchased courses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
