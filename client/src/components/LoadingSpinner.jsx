import React from "react";
import { Loader2, BookOpen } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4">
      <div className="flex flex-col items-center text-center">
        
        {/* Animated Icon Container */}
        <div className="relative flex items-center justify-center">
          
          {/* Pulse Ring */}
          <div className="absolute h-24 w-24 rounded-full bg-blue-200 opacity-40 animate-ping"></div>

          {/* Main Circle */}
          <div className="relative flex items-center justify-center h-20 w-20 rounded-full bg-white shadow-2xl border border-blue-100">
            <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
          </div>
        </div>

        {/* Branding */}
        <div className="mt-8 flex items-center gap-2">
          <BookOpen className="text-indigo-600 h-6 w-6" />
          <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
            SkillUp
          </h1>
        </div>

        {/* Loading Text */}
        <p className="mt-3 text-gray-600 text-sm md:text-base">
          Preparing your learning experience...
        </p>

        {/* Animated Dots */}
        <div className="flex gap-2 mt-5">
          <span className="h-3 w-3 rounded-full bg-blue-500 animate-bounce"></span>
          <span className="h-3 w-3 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.15s]"></span>
          <span className="h-3 w-3 rounded-full bg-purple-500 animate-bounce [animation-delay:0.3s]"></span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;