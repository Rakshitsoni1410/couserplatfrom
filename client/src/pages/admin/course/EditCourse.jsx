import { Button } from "@/components/ui/button";

import { ArrowLeft, BookOpen, PlayCircle, Sparkles } from "lucide-react";

import React from "react";

import { Link, useNavigate } from "react-router-dom";

import CourseTab from "./CourseTab";

const EditCourse = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-8">
          {/* LEFT SECTION */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => navigate("/admin/course")}
                className="h-12 w-12 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/30 transition-all duration-300 flex items-center justify-center"
              >
                <ArrowLeft size={20} className="text-slate-300" />
              </button>

              <div className="h-14 w-14 rounded-2xl bg-indigo-600/15 border border-indigo-500/20 flex items-center justify-center">
                <BookOpen className="text-indigo-400 w-7 h-7" />
              </div>

              <div>
                <h1 className="text-4xl font-bold">Edit Course</h1>

                <p className="text-slate-400 mt-1">
                  Update and manage your course information.
                </p>
              </div>
            </div>

            {/* BADGE */}
            <div className="flex items-center gap-2 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 px-4 py-2 rounded-full w-fit text-sm">
              <Sparkles size={16} />
              Professional Course Management
            </div>
          </div>

          {/* RIGHT BUTTON */}
          <Link to="lecture">
            <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-2xl h-12 px-6 text-base shadow-lg shadow-indigo-500/20">
              <PlayCircle className="mr-2 h-5 w-5" />
              Go to Lectures
            </Button>
          </Link>
        </div>

        {/* COURSE TAB */}
        <div className="rounded-3xl overflow-hidden">
          <CourseTab />
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
