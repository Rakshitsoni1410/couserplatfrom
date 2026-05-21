import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, AlertCircle } from "lucide-react";

import Course from "./Course";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";

const Courses = () => {
  const { data, isLoading, isError } = useGetPublishedCourseQuery();

  // Error State
  if (isError) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="bg-red-100 p-5 rounded-full mb-4">
          <AlertCircle className="h-10 w-10 text-red-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Failed to Load Courses
        </h1>

        <p className="text-gray-500 mt-2 max-w-md">
          Something went wrong while fetching courses. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-blue-50 dark:from-[#0f0f0f] dark:to-[#141414] min-h-screen">

      {/* Hero Section */}
      <div className="text-center pt-16 pb-10 px-4">
        <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-5">
          <BookOpen className="h-4 w-4" />
          Explore Top Learning Courses
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
          Upgrade Your Skills <br />
          With Premium Courses
        </h1>

        <p className="mt-5 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
          Learn from expert instructors and boost your career with high-quality,
          industry-focused online courses.
        </p>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <CourseSkeleton key={index} />
            ))}
          </div>
        ) : data?.courses?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.courses.map((course) => (
              <Course key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <div className="min-h-[40vh] flex flex-col items-center justify-center text-center">
            <div className="bg-gray-200 dark:bg-gray-800 p-6 rounded-full mb-4">
              <BookOpen className="h-10 w-10 text-gray-500" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              No Courses Available
            </h2>

            <p className="text-gray-500 mt-2">
              Courses will appear here once published.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;

// ========================================
// Skeleton Loader
// ========================================

const CourseSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-800">

      {/* Image Skeleton */}
      <Skeleton className="w-full h-52 rounded-none" />

      <div className="p-5 space-y-4">

        {/* Title */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/4 rounded-md" />
          <Skeleton className="h-5 w-1/2 rounded-md" />
        </div>

        {/* Creator */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-3 w-16 rounded-md" />
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-between pt-2">
          <Skeleton className="h-4 w-12 rounded-md" />
          <Skeleton className="h-4 w-12 rounded-md" />
          <Skeleton className="h-4 w-12 rounded-md" />
        </div>

        {/* Price */}
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>
    </div>
  );
};