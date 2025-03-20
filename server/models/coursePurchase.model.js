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
      enum: ["pending", "success", "failed"], // Changed 'completed' to 'success'
      default: "pending",
    },
    paymentId: {
      type: String,
      unique: true,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["card", "upi"],
      required: true,
    },
    upiId: {
      type: String,
      validate: {
        validator: function (value) {
          return this.paymentMethod === "upi" ? !!value : true;
        },
        message: "UPI ID is required for UPI payments",
      },
    },
    cardNumber: {
      type: String,
      validate: {
        validator: function (value) {
          return this.paymentMethod === "card" ? !!value && value.length === 4 : true;
        },
        message: "Only the last 4 digits of the card should be stored",
      },
      set: function (value) {
        return value ? value.slice(-4) : value; // Store only last 4 digits
      },
    },
  },
  { timestamps: true }
);

export const CoursePurchase = mongoose.model("CoursePurchase", coursePurchaseSchema);
