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
    const { id: userId, name: userName } = req.user;
    const { courseId, paymentMethod, upiId, cardNumber } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found!",
        redirectUrl: `http://localhost:5173/course-detail/${courseId}`,
      });
    }

    const paymentId = `PAY_${Date.now()}`;

    const newPurchase = new CoursePurchase({
      courseId,
      userId,
      amount: course.coursePrice,
      status: "pending",
      paymentId,
      paymentMethod,
      upiId: paymentMethod === "upi" ? upiId : undefined,
      cardNumber: paymentMethod === "card" ? cardNumber : undefined,
    });

    await newPurchase.save();

    return res.status(200).json({
      success: true,
      message: `Payment initialized for ${userName}. Waiting for confirmation!`,
      paymentId,
      redirectUrl: `http://localhost:5173/course-progress/${courseId}`,
    });
  } catch (error) {
    console.error("Checkout Error:", error);
    return res.status(500).json({
      success: false,
      message: "Payment failed. Please try again!",
      redirectUrl: `http://localhost:5173/course-detail/${req.body.courseId}`,
    });
  }
};

export const paymentWebhook = async (req, res) => {
  try {
    const payload = req.body;

    const isValidWebhook = webhookSignatureVerification(req); // Simulated checker
    if (!isValidWebhook) {
      return res.status(400).send("Invalid Webhook Signature");
    }

    if (payload.event !== "payment.success") {
      return res.status(400).json({ message: "Invalid event type" });
    }

    const paymentData = payload.data;

    const purchase = await CoursePurchase.findOne({
      paymentId: paymentData.paymentId,
    }).populate("courseId");

    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    purchase.status = "completed";

    // Unlock all lectures
    if (purchase.courseId?.lectures?.length > 0) {
      await Lecture.updateMany(
        { _id: { $in: purchase.courseId.lectures } },
        { $set: { isPreviewFree: true } }
      );
    }

    await purchase.save();

    // Add course to user's enrolledCourses
    await User.findByIdAndUpdate(
      purchase.userId,
      { $addToSet: { enrolledCourses: purchase.courseId._id } }
    );

    // Add user to course's enrolledStudents
    await Course.findByIdAndUpdate(
      purchase.courseId._id,
      { $addToSet: { enrolledStudents: purchase.userId } }
    );

    return res.status(200).json({
      success: true,
      message: "Payment successful and course enrolled!",
    });
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
