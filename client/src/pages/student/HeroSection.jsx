import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Sparkles, ArrowRight, BookOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();

    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }

    setSearchQuery("");
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 dark:from-[#0f172a] dark:via-[#111827] dark:to-[#1e1b4b] py-28 px-4">

      {/* Background Blur Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full text-sm font-medium mb-8 shadow-lg">
          <Sparkles className="h-4 w-4 text-yellow-300" />
          Learn From Industry Experts
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight">
          Find The Perfect <br />
          <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
            Course For You
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
          Learn modern skills, build real-world projects, and accelerate your
          career with premium online courses designed by top instructors.
        </p>

        {/* Search Form */}
        <form
          onSubmit={searchHandler}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 max-w-3xl mx-auto"
        >
          <div className="relative w-full">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />

            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses like React, AI, Web Dev..."
              className="h-16 pl-14 pr-5 rounded-2xl border-0 bg-white/95 backdrop-blur-md text-gray-900 placeholder:text-gray-500 shadow-2xl focus-visible:ring-2 focus-visible:ring-yellow-300 text-lg"
            />
          </div>

          <Button
            type="submit"
            className="h-16 px-8 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-lg shadow-2xl transition-all duration-300 hover:scale-105"
          >
            Search
          </Button>
        </form>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">

          <Button
            onClick={() => navigate(`/course/search?query`)}
            className="bg-white text-blue-700 hover:bg-blue-50 rounded-2xl px-8 py-6 text-base font-semibold shadow-xl transition-all duration-300 hover:scale-105"
          >
            <BookOpen className="mr-2 h-5 w-5" />
            Explore Courses
          </Button>

          <Button
            variant="outline"
            className="border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 rounded-2xl px-8 py-6 text-base font-semibold transition-all duration-300 hover:scale-105"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">

          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-lg">
            <h2 className="text-3xl font-bold text-white">500+</h2>
            <p className="text-blue-100 mt-1">Premium Courses</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-lg">
            <h2 className="text-3xl font-bold text-white">50K+</h2>
            <p className="text-blue-100 mt-1">Active Students</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-lg">
            <h2 className="text-3xl font-bold text-white">100+</h2>
            <p className="text-blue-100 mt-1">Expert Mentors</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-lg">
            <h2 className="text-3xl font-bold text-white">4.9★</h2>
            <p className="text-blue-100 mt-1">Student Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;