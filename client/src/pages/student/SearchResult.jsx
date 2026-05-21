import React from "react";
import { Link } from "react-router-dom";
import {
  Star,
  Clock3,
  Users,
  ArrowRight,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const SearchResult = ({ course }) => {
  return (
    <Link to={`/course-detail/${course._id}`} className="block group">
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-1">

        <div className="flex flex-col lg:flex-row">

          {/* Thumbnail */}
          <div className="relative overflow-hidden lg:w-[320px]">

            <img
              src={course.courseThumbnail}
              alt={course.courseTitle}
              className="h-64 lg:h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

            {/* Level Badge */}
            <div className="absolute top-4 left-4">
              <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full shadow-lg">
                {course.courseLevel}
              </Badge>
            </div>

            {/* Price */}
            <div className="absolute bottom-4 left-4">
              <div className="bg-white/90 backdrop-blur-md text-gray-900 px-4 py-2 rounded-full text-sm font-bold shadow-md">
                ₹{course.coursePrice}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 flex flex-col justify-between">

            <div>

              {/* Title */}
              <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                {course.courseTitle}
              </h1>

              {/* Subtitle */}
              <p className="mt-3 text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                {course.subTitle}
              </p>

              {/* Instructor */}
              <div className="mt-5 flex items-center gap-3">

                <img
                  src={
                    course.creator?.photoUrl ||
                    "https://github.com/shadcn.png"
                  }
                  alt={course.creator?.name}
                  className="h-12 w-12 rounded-full object-cover border-2 border-blue-100 shadow-sm"
                />

                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Instructor
                  </p>

                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {course.creator?.name}
                  </h3>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">

                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>4.8 Rating</span>
                </div>

                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>2.5k Students</span>
                </div>

                <div className="flex items-center gap-1">
                  <Clock3 className="h-4 w-4" />
                  <span>12 Hours</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 flex items-center justify-between flex-wrap gap-4">

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Starting from
                </p>

                <h2 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                  ₹{course.coursePrice}
                </h2>
              </div>

              <Button className="rounded-2xl px-6 py-6 text-base font-semibold shadow-lg transition-all duration-300 group-hover:scale-105">
                View Course
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResult;