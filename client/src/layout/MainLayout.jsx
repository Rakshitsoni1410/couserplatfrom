import Navbar from "@/components/ui/Navbar";

import React from "react";

import { Outlet } from "react-router-dom";

import {
  Sparkles,
  ArrowUp,
} from "lucide-react";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white overflow-hidden relative">

      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 blur-3xl rounded-full" />

        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/10 blur-3xl rounded-full" />

      </div>

      {/* NAVBAR */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-slate-800">

        <Navbar />

      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 relative z-10 pt-20">

        <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-6">

          {/* PAGE BADGE */}
          <div className="mb-6 flex items-center justify-between flex-wrap gap-4">

            <div className="flex items-center gap-2 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 px-4 py-2 rounded-full text-sm w-fit">

              <Sparkles size={16} />

              NextSkills Learning Platform

            </div>

            {/* SCROLL TO TOP */}
            <button
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              className="h-11 w-11 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/30 transition-all duration-300 flex items-center justify-center hover:shadow-lg hover:shadow-indigo-500/10"
            >
              <ArrowUp
                size={18}
                className="text-slate-300"
              />
            </button>
          </div>

          {/* PAGE CONTENT */}
          <div className="rounded-3xl">

            <Outlet />

          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-slate-800 bg-slate-950/70 backdrop-blur-xl">

        <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">

          <p className="text-sm text-slate-500">
            © 2026 NextSkills. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-sm text-slate-500">

            Built with ❤️ using React + Tailwind

          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;