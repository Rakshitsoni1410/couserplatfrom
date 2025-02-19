import { ChartNoAxesColumn, Square, SquareLibrary } from "lucide-react";
import React from "react";

const Sidebar = () => {
  return (
    <div className="hidden  lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-r-gray-300 dark:border-r-gray-700 bg-[#f0f0f0] p-5 sticky tops-0 h-screen">
      <div className="space-y-4">
        <Link>
          <ChartNoAxesColumn size={22} />
          <h1>Dasboard</h1>
        </Link>
        <SquareLibrary/>
      </div>
    </div>
  );
};

export default Sidebar;
