
import React from "react";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

import Course from "./Course";

import { Button } from "@/components/ui/button";
import { useLoadUserQuery } from "@/features/api/authApi";

const MyLearning = () => {
  const { data, isLoading } = useLoadUserQuery();

  const myLearning = data?.user?.enrolledCourses || [];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-24">

      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
          My Learning
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Continue your learning journey.
        </p>
      </div>

      {/* Loading */}
      {isLoading ? (
        <MyLearningSkeleton />
      ) : myLearning.length === 0 ? (

        /* Empty State */
        <div className="flex flex-col items-center justify-center text-center bg-white dark:bg-[#1a1a1a] border rounded-3xl p-10 shadow-sm">

          <div className="bg-blue-100 dark:bg-blue-900/20 p-5 rounded-full mb-5">
            <BookOpen className="h-10 w-10 text-blue-600" />
          </div>

          <h2 className="text-2xl font-bold mb-2">
            No Courses Yet
          </h2>

          <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
            You haven’t enrolled in any course yet.
            Start learning by exploring our courses.
          </p>

          <Link to="/courses">
            <Button className="rounded-2xl px-6">
              Browse Courses
            </Button>
          </Link>
        </div>
      ) : (

        /* Courses Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myLearning.map((course) => (
            <Course
              key={course._id}
              course={course}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLearning;

/* ========================================= */
/* Skeleton */
/* ========================================= */

const MyLearningSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="rounded-3xl overflow-hidden border bg-white dark:bg-[#1a1a1a] shadow-sm"
        >

          {/* Image Skeleton */}
          <div className="h-40 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>

          <div className="p-5 space-y-4">

            {/* Title */}
            <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>

            {/* Subtitle */}
            <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>

            {/* Button */}
            <div className="h-10 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

