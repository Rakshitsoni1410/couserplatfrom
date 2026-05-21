import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  FileEdit,
  Sparkles,
} from "lucide-react";

import React from "react";
import { Link, useParams } from "react-router-dom";

import LectureTab from "./LectureTab";

const EditLecture = () => {
  const { courseId } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white p-4 md:p-8">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

          {/* Left Side */}
          <div className="flex items-center gap-4">

            <Link to={`/admin/course/${courseId}/lecture`}>
              <Button
                size="icon"
                variant="outline"
                className="rounded-full border-slate-700 bg-slate-900 hover:bg-slate-800 text-white h-11 w-11"
              >
                <ArrowLeft size={18} />
              </Button>
            </Link>

            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <FileEdit className="w-8 h-8 text-indigo-400" />
                Edit Lecture
              </h1>

              <p className="text-slate-400 mt-1">
                Update lecture details, videos, and resources.
              </p>
            </div>
          </div>

          {/* Right Badge */}
          <div className="flex items-center gap-2 bg-indigo-600/15 border border-indigo-500/20 px-4 py-2 rounded-full text-indigo-400 text-sm w-fit">
            <Sparkles size={16} />
            Smart Lecture Editor
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-5 md:p-8 shadow-2xl">

          <LectureTab />

        </div>
      </div>
    </div>
  );
};

export default EditLecture;