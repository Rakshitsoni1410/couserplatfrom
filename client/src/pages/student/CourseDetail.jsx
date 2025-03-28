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
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams, Link } from "react-router-dom";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } =
    useGetCourseDetailWithStatusQuery(courseId);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Failed to load course details</h1>;

  const { course, purchased } = data;

  return (
    <div className="space-y-5 pt-20">
      {/* Header */}
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">
            {course?.courseTitle || "No Title Available"}
          </h1>
          <p className="text-base md:text-lg">
            {course?.subTitle || "No subtitle available"}
          </p>
          <p>
            Created By{" "}
            <span className="text-[#C0C4FC] underline italic">
              {course?.creator?.name || "Unknown Instructor"}
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last updated {course?.createdAt?.split("T")[0] || "N/A"}</p>
          </div>
          <p>Students enrolled: {course?.enrolledStudents?.length || 0}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        {/* Left Section */}
        <div className="w-full lg:w-2/3 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p
            className="text-sm"
            dangerouslySetInnerHTML={{
              __html: course?.description || "No description available",
            }}
          />
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>
                {course?.lectures?.length || 0} lectures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {course?.lectures?.length > 0 ? (
                course.lectures.map((lecture, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm">
                    {lecture?.isPreviewFree ? (
                      <PlayCircle size={14} />
                    ) : (
                      <Lock size={14} />
                    )}
                    <p>{lecture?.lectureTitle || "Untitled Lecture"}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No lectures available</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4">
                {course?.lectures?.length > 0 ? (
                  <ReactPlayer
                    width="100%"
                    height="100%"
                    url={course?.lectures[0]?.videoUrl}
                    controls
                  />
                ) : (
                  <p className="text-center text-gray-500">
                    No preview video available
                  </p>
                )}
              </div>
              <h1 className="mb-2">
                {course?.lectures?.[0]?.lectureTitle || "Untitled Lecture"}
              </h1>
              <Separator className="my-2" />
              <h1 className="text-lg md:text-xl font-semibold">
                {course?.coursePrice ? `₹${course.coursePrice}` : "Free"}
              </h1>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 p-4">
              {purchased ? (
                <Link
                  to={`/course-progress/${course?._id}`}
                  className="w-full"
                >
                  <Button className="w-full">Continue Course</Button>
                </Link>
              ) : (
                <BuyCourseButton courseId={course?._id} />
              )}

              {/* ✅ Only show review button if purchased */}
                <Button
                  onClick={() => navigate(`/review/${course?._id}`)}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold transition-all duration-300"
                >
                  ✍️ Give a Review
                </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
