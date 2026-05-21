import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateLectureMutation,
  useGetCourseLectureQuery,
} from "@/features/api/courseApi";

import {
  Loader2,
  PlusCircle,
  BookOpen,
  ArrowLeft,
} from "lucide-react";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import Lecture from "./Lecture";

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");

  const { courseId } = useParams();

  const navigate = useNavigate();

  const [
    createLecture,
    {
      isLoading: isCreating,
      isSuccess,
      error,
    },
  ] = useCreateLectureMutation();

  const {
    data: lectureData,
    isLoading: lectureLoading,
    error: lectureError,
    refetch,
  } = useGetCourseLectureQuery(courseId);

  const createLectureHandler = async () => {
    if (!lectureTitle.trim()) {
      return toast.error("Lecture title is required");
    }

    await createLecture({
      lectureTitle,
      courseId,
    });

    setLectureTitle("");
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();

      toast.success("Lecture created successfully!");
    }

    if (error) {
      toast.error(
        error?.data?.message || "Failed to create lecture"
      );
    }
  }, [isSuccess, error, refetch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white p-4 md:p-8">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-indigo-400" />
              Create New Lecture
            </h1>

            <p className="text-slate-400 mt-2">
              Add lectures and manage your course content easily.
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() =>
              navigate(`/admin/course/${courseId}`)
            }
            className="border-slate-700 bg-slate-900 hover:bg-slate-800 text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Course
          </Button>
        </div>

        {/* Create Lecture Card */}
        <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-2xl">

          <div className="space-y-5">

            <div>
              <Label className="text-slate-300 text-sm mb-2 block">
                Lecture Title
              </Label>

              <Input
                type="text"
                value={lectureTitle}
                onChange={(e) =>
                  setLectureTitle(e.target.value)
                }
                placeholder="Enter lecture title..."
                className="h-12 bg-slate-950 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-indigo-500 rounded-xl"
              />
            </div>

            <Button
              disabled={isCreating}
              onClick={createLectureHandler}
              className="w-full md:w-fit bg-indigo-600 hover:bg-indigo-700 rounded-xl h-11 px-6 text-base"
            >
              {isCreating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Create Lecture
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Lecture List */}
        <div className="mt-10">

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">
              Course Lectures
            </h2>

            <div className="bg-indigo-600/20 text-indigo-400 px-4 py-1 rounded-full text-sm">
              {lectureData?.lectures?.length || 0} Lectures
            </div>
          </div>

          {lectureLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
            </div>
          ) : lectureError ? (
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center">
              <p className="text-red-400">
                Failed to load lectures.
              </p>
            </div>
          ) : lectureData?.lectures?.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center">

              <div className="flex justify-center mb-4">
                <BookOpen className="w-14 h-14 text-slate-600" />
              </div>

              <h3 className="text-xl font-semibold text-slate-300">
                No Lectures Yet
              </h3>

              <p className="text-slate-500 mt-2">
                Start by creating your first lecture.
              </p>
            </div>
          ) : (
            <div className="grid gap-5">
              {lectureData?.lectures?.map(
                (lecture, index) => (
                  <div
                    key={lecture._id}
                    className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 hover:border-indigo-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10"
                  >
                    <Lecture
                      lecture={lecture}
                      courseId={courseId}
                      index={index}
                    />
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;