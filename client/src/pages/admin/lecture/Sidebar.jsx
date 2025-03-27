import { ChartNoAxesColumn, Square, SquareLibrary } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Star } from "lucide-react"
const Sidebar = () => {
  return (
    <div className="flex ">
      <div className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-r-gray-300 dark:border-r-gray-700 dark:bg-[#141414] bg-[#f0f0f0] p-5 sticky tops-0 h-screen">
        <div className=" space-y-4">
          <Link to="dashboard" className="flex item-center gap-2 ">
            <ChartNoAxesColumn size={22} />
            <h1>Dasboard</h1>
          </Link>
          <Link to="course" className="flex item-center gap-2 ">
            <SquareLibrary size={22} />
            <h1>Courses </h1>
          </Link>
          <Link to="review" className="flex items-center gap-2 text-gray-700 hover:text-yellow-500 transition-colors">
            <Star size={22} />
            <h1 className="text-base font-medium">Reviews</h1>
          </Link>
        </div>
      </div>
      <div className="flex-1 p-10 bg-white  dark:bg-[#141414] ">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
