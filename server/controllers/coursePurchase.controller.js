import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";
import { webhookSignatureVerification } from "../utils/paymentWebhook.js"; 
import  mongoose   from "mongoose";
/**
 * Real Payment Processing (Transaction Pending)
 */
export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.id; // ⬅️ Authenticated user's ID
    const { courseId, paymentMethod, cardNumber } = req.body;

    // ✅ Validate courseId
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid courseId!",
      });
    }

    // ✅ Check course existence
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found!",
        redirectUrl: `http://localhost:5173/course-detail/${courseId}`,
      });
    }

    // ✅ Generate a fake payment ID
    const paymentId = `PAY_${Date.now()}`;

    // ✅ Create a new purchase entry
    const newPurchase = new CoursePurchase({
      courseId,
      userId,
      amount: course.coursePrice,
      status: "pending",
      paymentId,
      paymentMethod, // Optional: "card" or "upi"
      cardNumber,    // Optional: only if card is used
    });

    await newPurchase.save();

    // ✅ Respond with redirect info
    return res.status(200).json({
      success: true,
      message: `Payment initialized. Waiting for confirmation!`,
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
// payment web hook 
export const paymentWebhook = async (req, res) => {
  try {
    console.log("🔔 Webhook triggered!", req.body);

    const { event, data } = req.body;

    if (event !== "payment.success") {
      return res.status(400).json({ message: "Invalid event type" });
    }

    const purchase = await CoursePurchase.findOne({ paymentId: data.paymentId }).populate("courseId");

    if (!purchase) return res.status(404).json({ message: "Purchase not found" });

    purchase.status = "completed";
    if (data.amount) purchase.amount = data.amount;

    if (purchase.courseId?.lectures?.length > 0) {
      await Lecture.updateMany(
        { _id: { $in: purchase.courseId.lectures } },
        { $set: { isPreviewFree: true } }
      );
    }

    await purchase.save();

    await User.findByIdAndUpdate(
      purchase.userId,
      { $addToSet: { enrolledCourses: purchase.courseId._id } }
    );

    await Course.findByIdAndUpdate(
      purchase.courseId._id,
      { $addToSet: { enrolledStudents: purchase.userId } }
    );

    res.status(200).json({ success: true, message: "Payment completed!" });

  } catch (err) {
    console.error("❌ Webhook error:", err);
    res.status(500).json({ message: "Internal Server Error" });
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
