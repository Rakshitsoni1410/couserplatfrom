import React from "react";
import { Link } from "react-router-dom";
import {
  Clock3,
  Star,
  Users,
  BookOpen,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const Course = ({ course }) => {
  return (
    <Link to={`/course-detail/${course._id}`} className="block group">
      <Card className="overflow-hidden border-0 rounded-2xl bg-white dark:bg-gray-900 shadow-md hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">

        {/* Thumbnail */}
        <div className="relative overflow-hidden">
          <img
            src={course.courseThumbnail}
            alt={course.courseTitle}
            className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

          {/* Level Badge */}
          <div className="absolute top-4 right-4">
            <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
              {course.courseLevel}
            </Badge>
          </div>

          {/* Price */}
          <div className="absolute bottom-4 left-4">
            <div className="bg-white/90 backdrop-blur-md text-gray-900 px-4 py-1 rounded-full text-sm font-bold shadow-md">
              ₹{course.coursePrice}
            </div>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-5 space-y-4">

          {/* Title */}
          <div>
            <h1 className="text-xl font-bold line-clamp-2 text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors duration-300">
              {course.courseTitle}
            </h1>
          </div>

          {/* Creator */}
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-blue-100 shadow-sm">
              <AvatarImage
                src={
                  course.creator?.photoUrl ||
                  "https://github.com/shadcn.png"
                }
                alt={course.creator?.name}
              />
              <AvatarFallback>
                {course.creator?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>

            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {course.creator?.name}
              </p>
              <p className="text-xs text-gray-500">
                Course Instructor
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between pt-2 text-sm text-gray-500 dark:text-gray-400">

            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>4.8</span>
            </div>

            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>2.5k+</span>
            </div>

            <div className="flex items-center gap-1">
              <Clock3 className="h-4 w-4" />
              <span>12 hrs</span>
            </div>

            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>24 lessons</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Course;