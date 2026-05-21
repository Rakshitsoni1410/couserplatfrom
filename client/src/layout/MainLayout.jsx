
import Navbar from "@/components/ui/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0f0f0f]">

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 pt-16">
        <Outlet />
      </main>

    </div>
  );
};

export default MainLayout;

