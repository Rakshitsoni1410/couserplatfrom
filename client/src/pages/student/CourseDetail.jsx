import { Button } from "@/components/ui/button";
import BuyCourseButton from "@/components/ui/BuyCourseButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BadgeInfo, PlayCircle, Lock } from "lucide-react";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  // Static course data (API removed)
  const course = {
    title: "React Fundamentals",
    subtitle: "Learn the basics of React.js",
    creator: { name: "Rakshit" },
    updatedAt: "2025-02-10",
    enrolledStudents: [1, 2, 3, 4],
    description:
      "This is a course about React. It is a popular front-end framework used for building user interfaces. It is known for its simplicity and flexibility.",
    coursePrice: 999,
    lectures: [
      { title: "Introduction to React", isFreePreview: true },
      { title: "React Components", isFreePreview: false },
      { title: "State and Props", isFreePreview: false },
    ],
  };

  const purchased = false; // Change this to true if the user has purchased

  return (
    <div className="mt-24 space-y-5">
      {/* Course Header */}
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">{course.title}</h1>
          <p className="text-base md:text-lg">{course.subtitle}</p>
          <p>
            Created by {" "}
            <span className="text-[#C0C4FC] underline italic">{course.creator.name}</span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last updated {course.updatedAt}</p>
          </div>
          <p>Students enrolled: {course.enrolledStudents.length}</p>
        </div>
      </div>

      {/* Course Details */}
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p className="text-sm">{course.description}</p>

          {/* Course Content */}
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>Course content will be updated soon</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {course.lectures.length > 0 ? (
                course.lectures.map((lecture, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm">
                    <span>{purchased ? <PlayCircle size={14} /> : <Lock size={14} />}</span>
                    <p>{lecture.title}</p>
                  </div>
                ))
              ) : (
                <p>No lectures available yet.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Course Purchase Section */}
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4">Video coming soon</div>
              <h1>{course.title}</h1>
              <Separator className="my-2" />
              <h1 className="text-lg md:text-xl font-semibold">Price: ₹{course.coursePrice}</h1>
            </CardContent>
            <CardFooter className="flex justify-center p-1">
              {purchased ? (
                <Button className="w-full" onClick={() => navigate(`/course-progress/${courseId}`)}>
                  Continue Course
                </Button>
              ) : (
                <BuyCourseButton courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
