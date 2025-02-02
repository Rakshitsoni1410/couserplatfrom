import { School } from "lucide-react"; // ✅ Import the School icon
import React from "react";

const Navbar = () => {
  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10 flex items-center px-4 gap-3">
      <School size={30} /> {/* ✅ Corrected icon usage */}
      <h1 className="hidden md:block font-extrabold text-2xl">E-Learning</h1>
    </div>
  );
};

export default Navbar;
