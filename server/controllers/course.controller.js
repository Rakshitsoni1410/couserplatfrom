import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import { deleteMediaFromCloudinary } from "../utils/cloudinary.js";
import { uploadMedia } from "../utils/cloudinary.js";

export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    if (!courseTitle || !category) {
      return res
        .status(400)
        .json({ message: "Please provide course title and category" });
    }
    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });
    res.status(201).json({ course, message: "Course created successfully" });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Failed to create course" });
  }
};

export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.id;
    const courses = await Course.find({ creator: userId });
    res.status(200).json({
      courses,
      message: courses.length
        ? "Courses retrieved successfully"
        : "No courses found",
    });
  } catch (error) {
    console.error("Error retrieving courses:", error);
    res.status(500).json({ message: "Failed to retrieve courses" });
  }
};

export const editCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
    } = req.body;
    const thumbnail = req.file;

    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found!",
      });
    }
    let courseThumbnail;
    if (thumbnail) {
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId); // delete old image
      }
      // upload a thumbnail on clourdinary
      courseThumbnail = await uploadMedia(thumbnail.path);
    }

    const updateData = {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
      courseThumbnail: courseThumbnail?.secure_url,
    };

    course = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });

    return res.status(200).json({
      course,
      message: "Course updated successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create course",
    });
  }
};
export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found!",
      });
    }
    return res.status(200).json({
      course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get  course by id",
    });
  }
};

export const createCourseLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;

    if (!lectureTitle || !courseId) {
      return res.status(400).json({
        message: "Please provide lecture title and course ID",
      });
    }

    // Check if course exists first
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Create a new lecture
    const lecture = await Lecture.create({ lectureTitle });

    // Initialize lectures array if not present
    if (!course.lectures) {
      course.lectures = [];
    }

    // Add lecture to course
    course.lectures.push(lecture._id);
    await course.save();

    return res.status(201).json({
      lecture,
      message: "Course lecture created successfully",
    });
  } catch (error) {
    console.error("Error creating lecture:", error);
    return res.status(500).json({
      message: "Failed to create course lecture",
      error: error.message,
    });
  }
};

export const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate("lectures"); // Ensure lectures are populated
    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }
    
    return res.status(200).json({
      lectures: course.lectures, // Send lectures
      message: "Lectures retrieved successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to get lecture" });
  }
};
