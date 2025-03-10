import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";
import { v4 as uuidv4 } from "uuid"; // For generating unique fake payment IDs

// Create a fake checkout session
export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId, paymentMethod, upiId, cardNumber } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found!" });

    // Generate a fake transaction ID
    const fakePaymentId = "FAKE_TXN_" + uuidv4();

    // Store fake payment in the database
    const newPurchase = new CoursePurchase({
      courseId,
      userId,
      amount: course.coursePrice,
      status: "completed", // Instantly mark as completed
      paymentId: fakePaymentId,
      paymentMethod,
      paymentDetails: paymentMethod === "upi" ? upiId : `**** **** **** ${cardNumber.slice(-4)}`,
    });

    await newPurchase.save();

    return res.status(200).json({
      success: true,
      message: "Payment Successful!",
      paymentId: fakePaymentId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Simulate webhook handling after successful payment
export const fakePaymentWebhook = async (req, res) => {
  try {
    const { paymentId } = req.body;

    const purchase = await CoursePurchase.findOne({ paymentId }).populate("courseId");

    if (!purchase) return res.status(404).json({ message: "Purchase not found" });

    purchase.status = "completed";

    // Unlock all lectures for the user
    if (purchase.courseId.lectures.length > 0) {
      await Lecture.updateMany(
        { _id: { $in: purchase.courseId.lectures } },
        { $set: { isPreviewFree: true } }
      );
    }

    // Enroll the user in the course
    await User.findByIdAndUpdate(
      purchase.userId,
      { $addToSet: { enrolledCourses: purchase.courseId._id } },
      { new: true }
    );

    // Add the user to the enrolled students list of the course
    await Course.findByIdAndUpdate(
      purchase.courseId._id,
      { $addToSet: { enrolledStudents: purchase.userId } },
      { new: true }
    );

    await purchase.save();

    return res.status(200).json({ success: true, message: "Payment confirmed!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get course details with purchase status
export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId)
      .populate("creator")
      .populate("lectures");

    const purchased = await CoursePurchase.findOne({ userId, courseId });

    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }

    return res.status(200).json({
      course,
      purchased: !!purchased,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all purchased courses
export const getAllPurchasedCourses = async (_, res) => {
  try {
    const purchasedCourses = await CoursePurchase.find({
      status: "completed",
    }).populate("courseId");

    return res.status(200).json({
      purchasedCourses: purchasedCourses || [],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
