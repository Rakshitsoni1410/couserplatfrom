import React from "react";
import ReactPlayer from "react-player";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  BadgeInfo,
  Lock,
  PlayCircle,
  Users,
  Star,
  Clock3,
  CheckCircle2,
} from "lucide-react";

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
import { Badge } from "@/components/ui/badge";

import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } =
    useGetCourseDetailWithStatusQuery(courseId);

  // =========================================
  // Loading State
  // =========================================

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0f0f0f]">
        <div className="flex flex-col items-center gap-5">
          <div className="h-16 w-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>

          <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            Loading Course Details...
          </h1>
        </div>
      </div>
    );
  }

  // =========================================
  // Error State
  // =========================================

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0f0f0f] px-4">
        <div className="bg-white dark:bg-gray-900 shadow-xl rounded-3xl p-10 text-center max-w-lg border border-gray-100 dark:border-gray-800">

          <div className="bg-red-100 dark:bg-red-900/20 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <BadgeInfo className="text-red-500 h-10 w-10" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Failed to Load Course
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-3">
            Something went wrong while fetching the course details.
          </p>

          <Button
            onClick={() => navigate("/")}
            className="mt-6 rounded-2xl"
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const { course, purchased } = data;

  return (
    <div className="bg-gradient-to-b from-gray-50 to-blue-50 dark:from-[#0f0f0f] dark:to-[#141414] min-h-screen">

      {/* ========================================= */}
      {/* Hero Section */}
      {/* ========================================= */}

      <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white">

        {/* Blur Effects */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-20">

          <div className="max-w-4xl">

            {/* Badge */}
            <Badge className="bg-white/20 text-white border-white/20 px-4 py-1 rounded-full mb-6">
              Premium Online Course
            </Badge>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              {course?.courseTitle || "No Title Available"}
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-lg md:text-xl text-blue-100 leading-relaxed">
              {course?.subTitle || "No subtitle available"}
            </p>

            {/* Instructor */}
            <div className="flex items-center gap-3 mt-8">

              <img
                src={
                  course?.creator?.photoUrl ||
                  "https://github.com/shadcn.png"
                }
                alt={course?.creator?.name}
                className="h-14 w-14 rounded-full object-cover border-2 border-white shadow-lg"
              />

              <div>
                <p className="text-sm text-blue-100">Created By</p>

                <h2 className="font-bold text-lg underline italic text-white">
                  {course?.creator?.name || "Unknown Instructor"}
                </h2>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6 mt-8 text-sm md:text-base text-blue-100">

              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span>4.8 Rating</span>
              </div>

              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>
                  {course?.enrolledStudents?.length || 0} Students
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Clock3 className="h-5 w-5" />
                <span>
                  {course?.lectures?.length || 0} Lectures
                </span>
              </div>

              <div className="flex items-center gap-2">
                <BadgeInfo className="h-5 w-5" />
                <span>
                  Updated{" "}
                  {course?.createdAt?.split("T")[0] || "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* Main Content */}
      {/* ========================================= */}

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 flex flex-col lg:flex-row gap-10">

        {/* ========================================= */}
        {/* Left Section */}
        {/* ========================================= */}

        <div className="w-full lg:w-2/3 space-y-8">

          {/* Description */}
          <Card className="rounded-3xl border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">
                Course Description
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div
                className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
                dangerouslySetInnerHTML={{
                  __html:
                    course?.description ||
                    "No description available",
                }}
              />
            </CardContent>
          </Card>

          {/* Course Content */}
          <Card className="rounded-3xl border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">
                Course Content
              </CardTitle>

              <CardDescription>
                {course?.lectures?.length || 0} lectures included
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">

              {course?.lectures?.length > 0 ? (
                course.lectures.map((lecture, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-2xl px-4 py-4 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">

                      <div className="bg-white dark:bg-gray-900 p-3 rounded-xl shadow-sm">
                        {lecture?.isPreviewFree ? (
                          <PlayCircle className="text-green-500 h-5 w-5" />
                        ) : (
                          <Lock className="text-gray-500 h-5 w-5" />
                        )}
                      </div>

                      <div>
                        <h1 className="font-semibold text-gray-900 dark:text-white">
                          {lecture?.lectureTitle ||
                            "Untitled Lecture"}
                        </h1>

                        <p className="text-sm text-gray-500">
                          {lecture?.isPreviewFree
                            ? "Free Preview"
                            : "Premium Content"}
                        </p>
                      </div>
                    </div>

                    {lecture?.isPreviewFree && (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        Preview
                      </Badge>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">
                  No lectures available
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* ========================================= */}
        {/* Right Section */}
        {/* ========================================= */}

        <div className="w-full lg:w-1/3">

          <div className="sticky top-24">
            <Card className="rounded-3xl overflow-hidden border-0 shadow-2xl">

              {/* Video */}
              <div className="aspect-video bg-black">
                {course?.lectures?.length > 0 ? (
                  <ReactPlayer
                    width="100%"
                    height="100%"
                    url={course?.lectures[0]?.videoUrl}
                    controls
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No Preview Available
                  </div>
                )}
              </div>

              <CardContent className="p-6">

                {/* Lecture */}
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  {course?.lectures?.[0]?.lectureTitle ||
                    "Untitled Lecture"}
                </h1>

                <Separator className="my-5" />

                {/* Features */}
                <div className="space-y-4">

                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-green-500 h-5 w-5" />
                    <p>Full Lifetime Access</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-green-500 h-5 w-5" />
                    <p>Certificate of Completion</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-green-500 h-5 w-5" />
                    <p>Access on Mobile & Desktop</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mt-8">

                  <h1 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">
                    {course?.coursePrice
                      ? `₹${course.coursePrice}`
                      : "Free"}
                  </h1>

                  <p className="text-sm text-gray-500 mt-1">
                    One-time payment
                  </p>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-3 p-6 pt-0">

                {purchased ? (
                  <Link
                    to={`/course-progress/${course?._id}`}
                    className="w-full"
                  >
                    <Button className="w-full rounded-2xl h-12 text-base font-semibold">
                      Continue Learning
                    </Button>
                  </Link>
                ) : (
                  <BuyCourseButton courseId={course?._id} />
                )}

                {/* Review Button */}
                <Button
                  onClick={() => navigate(`/review/${course?._id}`)}
                  className="w-full rounded-2xl h-12 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold transition-all duration-300"
                >
                  ✍️ Give a Review
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;