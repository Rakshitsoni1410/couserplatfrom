import { AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import React from "react";

const Course = () => {
  return (
    <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-80">
      <div className="relative">
        <img
          src="https://th.bing.com/th/id/OIP.EswnIVdSgBgzHz4sMPYA7gHaFj?w=241&h=181&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          alt="course"
          className="w-full h-36 object-cover rounded-t-lg"
        />
      </div>
      <CardContent>
        <h1 className="hover:underline font-bold text-lg truncate">
          {" "}
          Next .js complete course in hindi 2025{" "}
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Course;
