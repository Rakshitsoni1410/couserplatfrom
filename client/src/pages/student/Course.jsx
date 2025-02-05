import { Card } from "@/components/ui/card";
import React from "react";

const Course = () => {
  return (
    <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-80">
      <div className="relative">
        <img
          src="https://th.bing.com/th/id/OIP.EswnIVdSgBgzHz4sMPYA7gHaFj?w=241&h=181&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          
        />
      </div>
    </Card>
  );
};

export default Course
