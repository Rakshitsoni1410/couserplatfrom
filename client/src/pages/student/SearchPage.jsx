import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  AlertCircle,
  Search,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import Filter from "./Filter";
import SearchResult from "./SearchResult";

import { useGetSearchCourseQuery } from "@/features/api/courseApi";

const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query");

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const { data, isLoading } = useGetSearchCourseQuery({
    searchQuery: query,
    categories: selectedCategories,
    sortByPrice,
  });

  const courses = data?.courses || [];

  const isEmpty = !isLoading && courses.length === 0;

  const handleFilterChange = (categories, price) => {
    setSelectedCategories(categories);
    setSortByPrice(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 dark:from-[#0f0f0f] dark:to-[#141414]">

      {/* Header */}
      <div className="border-b bg-white/70 dark:bg-[#111]/70 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            {/* Search Info */}
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-1 rounded-full text-sm font-medium mb-3">
                <Sparkles className="h-4 w-4" />
                Search Results
              </div>

              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                Results for{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  "{query}"
                </span>
              </h1>

              <p className="text-gray-500 dark:text-gray-400 mt-2">
                {isLoading
                  ? "Searching courses..."
                  : `${courses.length} courses found`}
              </p>
            </div>

            {/* Search Icon Box */}
            <div className="hidden md:flex items-center justify-center h-20 w-20 rounded-3xl bg-blue-100 dark:bg-blue-900/20">
              <Search className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Filter Sidebar */}
          <div className="lg:w-[300px]">
            <div className="sticky top-28 bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 p-5">

              <div className="flex items-center gap-2 mb-5">
                <SlidersHorizontal className="h-5 w-5 text-blue-600" />
                <h2 className="font-bold text-lg text-gray-900 dark:text-white">
                  Filters
                </h2>
              </div>

              <Filter handleFilterChange={handleFilterChange} />
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 space-y-6">

            {isLoading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <CourseSkeleton key={idx} />
              ))
            ) : isEmpty ? (
              <CourseNotFound />
            ) : (
              courses.map((course) => (
                <SearchResult key={course._id} course={course} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

// =========================================
// No Courses Found
// =========================================

const CourseNotFound = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 py-20 px-6 flex flex-col items-center justify-center text-center">

      <div className="bg-red-100 dark:bg-red-900/20 p-5 rounded-full mb-6">
        <AlertCircle className="text-red-500 h-12 w-12" />
      </div>

      <h1 className="font-extrabold text-3xl text-gray-900 dark:text-white mb-3">
        No Courses Found
      </h1>

      <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
        We couldn't find any courses matching your search. Try using
        different keywords or filters.
      </p>

      <Link to="/">
        <Button className="rounded-xl px-6">
          Browse All Courses
        </Button>
      </Link>
    </div>
  );
};

// =========================================
// Loading Skeleton
// =========================================

const CourseSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-md border border-gray-100 dark:border-gray-800 overflow-hidden p-4">

      <div className="flex flex-col md:flex-row gap-5">

        {/* Image */}
        <Skeleton className="h-52 md:h-40 md:w-72 rounded-2xl" />

        {/* Content */}
        <div className="flex-1 space-y-4">

          <div className="space-y-2">
            <Skeleton className="h-6 w-3/4 rounded-md" />
            <Skeleton className="h-4 w-1/2 rounded-md" />
          </div>

          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />

            <div className="space-y-2">
              <Skeleton className="h-4 w-24 rounded-md" />
              <Skeleton className="h-3 w-16 rounded-md" />
            </div>
          </div>

          <div className="flex gap-3">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </div>

        {/* Price */}
        <div className="flex flex-row md:flex-col items-center justify-between md:justify-center gap-4">
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-10 w-28 rounded-xl" />
        </div>
      </div>
    </div>
  );
};