import mongoose from "mongoose";

const coursePurchaseSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    paymentId: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["card", "upi"],
      required: true,
    },
    upiId: {
      type: String,
      required: function () {
        return this.paymentMethod === "upi";
      },
    },
    cardNumber: {
      type: String,
      required: function () {
        return this.paymentMethod === "card";
      },
    },
  },
  { timestamps: true }
);

export const CoursePurchase = mongoose.model("CoursePurchase", coursePurchaseSchema);
