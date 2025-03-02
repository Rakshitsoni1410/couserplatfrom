import mongoose from "mongoose"; // ✅ Import mongoose

const courseSchema = new mongoose.Schema({
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
  courseLevel:{
    type:String,
    enum:["Beginner", "Medium", "Advance"]
},
  coursePrice: {
    type: Number,
    required: false,
    min: 0,
  },
  courseThumbnail: {
    type: String,
    default: "default-thumbnail.jpg",
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
}, { timestamps: true });

export const Course = mongoose.model("Course", courseSchema);
