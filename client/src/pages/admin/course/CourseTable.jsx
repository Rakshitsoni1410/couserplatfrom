import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useGetCreatorCourseQuery } from "@/features/api/courseApi";

import {
  Edit,
  Plus,
  BookOpen,
  Loader2,
  IndianRupee,
  Eye,
  Sparkles,
} from "lucide-react";

import React from "react";

import { useNavigate } from "react-router-dom";

const CourseTable = () => {
  const {
    data,
    isLoading,
    isError,
  } = useGetCreatorCourseQuery();

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">

        <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />

      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">

        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">

          <h1 className="text-red-400 text-lg font-semibold">
            Failed to load courses
          </h1>

        </div>
      </div>
    );
  }

  const courses = data?.courses || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white p-4 md:p-8">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">

          <div>

            <div className="flex items-center gap-3 mb-3">

              <div className="h-14 w-14 rounded-2xl bg-indigo-600/15 border border-indigo-500/20 flex items-center justify-center">

                <BookOpen className="text-indigo-400 w-7 h-7" />

              </div>

              <div>
                <h1 className="text-4xl font-bold">
                  My Courses
                </h1>

                <p className="text-slate-400 mt-1">
                  Manage and edit your created
                  courses.
                </p>
              </div>
            </div>
          </div>

          {/* CREATE BUTTON */}
          <Button
            onClick={() => navigate(`create`)}
            className="bg-indigo-600 hover:bg-indigo-700 rounded-xl h-12 px-6 text-base"
          >
            <Plus className="mr-2 h-5 w-5" />

            Create New Course
          </Button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          {/* TOTAL COURSES */}
          <div className="bg-slate-900/70 border border-slate-800 backdrop-blur-xl rounded-3xl p-6">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-slate-400 text-sm">
                  Total Courses
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {courses.length}
                </h2>
              </div>

              <div className="h-14 w-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center">

                <BookOpen className="text-indigo-400 w-7 h-7" />

              </div>
            </div>
          </div>

          {/* PUBLISHED */}
          <div className="bg-slate-900/70 border border-slate-800 backdrop-blur-xl rounded-3xl p-6">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-slate-400 text-sm">
                  Published
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {
                    courses.filter(
                      (course) =>
                        course.isPublished
                    ).length
                  }
                </h2>
              </div>

              <div className="h-14 w-14 rounded-2xl bg-green-500/10 flex items-center justify-center">

                <Eye className="text-green-400 w-7 h-7" />

              </div>
            </div>
          </div>

          {/* DRAFT */}
          <div className="bg-slate-900/70 border border-slate-800 backdrop-blur-xl rounded-3xl p-6">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-slate-400 text-sm">
                  Draft Courses
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {
                    courses.filter(
                      (course) =>
                        !course.isPublished
                    ).length
                  }
                </h2>
              </div>

              <div className="h-14 w-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center">

                <Sparkles className="text-yellow-400 w-7 h-7" />

              </div>
            </div>
          </div>
        </div>

        {/* TABLE CARD */}
        <div className="bg-slate-900/70 border border-slate-800 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl">

          {/* TABLE HEADER */}
          <div className="px-6 py-5 border-b border-slate-800">

            <h2 className="text-2xl font-semibold">
              Course List
            </h2>

            <p className="text-slate-400 text-sm mt-1">
              View and manage all your created
              courses.
            </p>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">

            <Table>

              <TableHeader>

                <TableRow className="border-slate-800 hover:bg-transparent">

                  <TableHead className="text-slate-400">
                    Price
                  </TableHead>

                  <TableHead className="text-slate-400">
                    Status
                  </TableHead>

                  <TableHead className="text-slate-400">
                    Course Title
                  </TableHead>

                  <TableHead className="text-right text-slate-400">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>

                {courses.length > 0 ? (
                  courses.map((course) => (
                    <TableRow
                      key={course._id}
                      className="border-slate-800 hover:bg-slate-900/60 transition-all duration-300"
                    >

                      {/* PRICE */}
                      <TableCell>

                        <div className="flex items-center gap-2 font-medium text-white">

                          <IndianRupee size={16} />

                          {course?.coursePrice ||
                            "Free"}

                        </div>
                      </TableCell>

                      {/* STATUS */}
                      <TableCell>

                        <Badge
                          className={`rounded-full px-3 py-1 text-xs
                          
                          ${
                            course.isPublished
                              ? "bg-green-500/15 text-green-400 border border-green-500/20"
                              : "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20"
                          }
                          `}
                        >
                          {course.isPublished
                            ? "Published"
                            : "Draft"}
                        </Badge>
                      </TableCell>

                      {/* TITLE */}
                      <TableCell className="font-medium text-white">

                        {course.courseTitle}

                      </TableCell>

                      {/* ACTION */}
                      <TableCell className="text-right">

                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() =>
                            navigate(
                              `${course._id}`
                            )
                          }
                          className="hover:bg-indigo-500/10 hover:text-indigo-400 rounded-xl"
                        >
                          <Edit size={18} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>

                    <TableCell
                      colSpan={4}
                      className="text-center py-20"
                    >

                      <div className="flex flex-col items-center justify-center">

                        <div className="h-20 w-20 rounded-full bg-slate-800 flex items-center justify-center mb-5">

                          <BookOpen className="w-10 h-10 text-slate-500" />

                        </div>

                        <h3 className="text-xl font-semibold text-slate-300">
                          No Courses Found
                        </h3>

                        <p className="text-slate-500 mt-2">
                          Start by creating your
                          first course.
                        </p>

                        <Button
                          onClick={() =>
                            navigate(`create`)
                          }
                          className="mt-6 bg-indigo-600 hover:bg-indigo-700 rounded-xl"
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Create Course
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseTable;