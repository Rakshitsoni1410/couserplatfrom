import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    courseTitle: {
      type: String,
      required: true,
      trim: true,
    },
    subTitle: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    courseLevel: {
      type: String,
      enum: ["beginner", "medium", "advanced"], // Fixed enum typo
      default: "beginner",
    },
    coursePrice: {
      type: Number, // Fixed `coursePrise` typo
      required: true,
      min: 0, // Ensures price is non-negative
    },
    courseThumbnail: {
      type: String,
      default: "default-thumbnail.jpg", // Optional default value
    },
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    lectures: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecture",
      },
    ],
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt fields
);

export const Course = mongoose.model("Course", courseSchema);
