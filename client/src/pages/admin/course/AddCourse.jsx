import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useCreateCourseMutation } from "@/features/api/courseApi";

import {
  Loader2,
  ArrowLeft,
  BookPlus,
  Sparkles,
} from "lucide-react";

import React, {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

const categories = [
  "Next JS",
  "Data Science",
  "Frontend Development",
  "Fullstack Development",
  "MERN Stack Development",
  "Backend Development",
  "Javascript",
  "Python",
  "Docker",
  "MongoDB",
  "HTML",
];

const AddCourse = () => {
  const [courseTitle, setCourseTitle] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [
    createCourse,
    {
      data,
      isLoading,
      error,
      isSuccess,
    },
  ] = useCreateCourseMutation();

  const navigate = useNavigate();

  const createCourseHandler = async () => {
    if (!courseTitle.trim()) {
      return toast.error(
        "Course title is required"
      );
    }

    if (!category) {
      return toast.error(
        "Please select a category"
      );
    }

    await createCourse({
      courseTitle,
      category,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        data?.message || "Course created."
      );

      navigate("/admin/course");
    }

    if (error) {
      toast.error(
        error?.data?.message ||
          "Failed to create course"
      );
    }
  }, [
    isSuccess,
    error,
    data,
    navigate,
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white p-4 md:p-8">

      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

          <div>

            <div className="flex items-center gap-3 mb-3">

              <div className="h-14 w-14 rounded-2xl bg-indigo-600/15 border border-indigo-500/20 flex items-center justify-center">

                <BookPlus className="text-indigo-400 w-7 h-7" />

              </div>

              <div>
                <h1 className="text-4xl font-bold">
                  Create Course
                </h1>

                <p className="text-slate-400 mt-1">
                  Add a new course to your
                  learning platform.
                </p>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={() =>
              navigate("/admin/course")
            }
            className="border-slate-700 bg-slate-900 hover:bg-slate-800 text-white rounded-xl"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        {/* FORM CARD */}
        <div className="bg-slate-900/70 border border-slate-800 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl">

          {/* TOP BADGE */}
          <div className="flex items-center gap-2 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 px-4 py-2 rounded-full w-fit mb-8 text-sm">

            <Sparkles size={16} />

            Create Professional Courses

          </div>

          <div className="space-y-8">

            {/* COURSE TITLE */}
            <div className="space-y-3">

              <Label className="text-slate-300 text-sm">
                Course Title
              </Label>

              <Input
                type="text"
                value={courseTitle}
                onChange={(e) =>
                  setCourseTitle(e.target.value)
                }
                placeholder="Ex: Complete MERN Stack Bootcamp"
                className="h-12 bg-slate-950 border-slate-700 text-white placeholder:text-slate-500 rounded-xl focus-visible:ring-indigo-500"
              />
            </div>

            {/* CATEGORY */}
            <div className="space-y-3">

              <Label className="text-slate-300 text-sm">
                Select Category
              </Label>

              <Select
                onValueChange={(value) =>
                  setCategory(value)
                }
              >
                <SelectTrigger className="w-full h-12 bg-slate-950 border-slate-700 text-white rounded-xl focus:ring-indigo-500">

                  <SelectValue placeholder="Choose course category" />

                </SelectTrigger>

                <SelectContent className="bg-slate-900 border-slate-700 text-white">

                  <SelectGroup>

                    <SelectLabel className="text-slate-400">
                      Categories
                    </SelectLabel>

                    {categories.map(
                      (item, index) => (
                        <SelectItem
                          key={index}
                          value={item}
                          className="focus:bg-slate-800 focus:text-white"
                        >
                          {item}
                        </SelectItem>
                      )
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* SELECTED CATEGORY */}
            {category && (
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">

                <p className="text-sm text-slate-400">
                  Selected Category
                </p>

                <h3 className="text-lg font-semibold text-indigo-400 mt-1">
                  {category}
                </h3>
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">

              <Button
                variant="outline"
                onClick={() =>
                  navigate("/admin/course")
                }
                className="w-full sm:w-fit border-slate-700 bg-slate-900 hover:bg-slate-800 text-white rounded-xl"
              >
                Cancel
              </Button>

              <Button
                disabled={isLoading}
                onClick={createCourseHandler}
                className="w-full sm:w-fit bg-indigo-600 hover:bg-indigo-700 rounded-xl h-12 px-8 text-base"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Course"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;