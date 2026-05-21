import {
  Edit,
  PlayCircle,
  Clock3,
} from "lucide-react";

import React from "react";
import { useNavigate } from "react-router-dom";

const Lecture = ({ lecture, courseId, index }) => {
  const navigate = useNavigate();

  const goToUpdateLecture = () => {
    navigate(
      `/admin/course/${courseId}/lecture/${lecture._id}`
    );
  };

  return (
    <div className="group flex items-center justify-between bg-slate-900/70 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 rounded-2xl px-5 py-4 hover:shadow-lg hover:shadow-indigo-500/10">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">

        {/* Lecture Icon */}
        <div className="h-12 w-12 rounded-xl bg-indigo-600/15 flex items-center justify-center border border-indigo-500/20">

          <PlayCircle className="text-indigo-400 w-6 h-6" />

        </div>

        {/* Lecture Info */}
        <div>
          <h1 className="font-semibold text-white text-lg">

            <span className="text-indigo-400 mr-2">
              #{index + 1}
            </span>

            {lecture.lectureTitle}
          </h1>

          <div className="flex items-center gap-2 mt-1 text-sm text-slate-400">

            <Clock3 size={14} />

            <span>Lecture Content</span>

          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <button
        onClick={goToUpdateLecture}
        className="h-11 w-11 rounded-xl bg-slate-800 hover:bg-indigo-600 transition-all duration-300 flex items-center justify-center group-hover:scale-105"
      >
        <Edit
          size={18}
          className="text-slate-300"
        />
      </button>
    </div>
  );
};

export default Lecture;