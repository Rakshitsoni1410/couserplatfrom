import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BadgeInfo, PlayCircle } from "lucide-react";
import React from "react";

const CourseDetail = () => {
  const purchasedCourse = true;
  return (
    <div className="mt-24 space-y-5 ">
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">Course Title</h1>
          <p className="text-base md:text-lg">course Sub-title </p>
          <p>
            Created by {""}
            <span className="text-[#C0C4FC] underline italic">Rakshit</span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last updated 25-11-2024</p>
          </div>
          <p>Student enrolled: 10</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        <div className=" w-full lg:w-1/2 space-y-5 ">
          <h1 className="font-bold text-xl md:text-2xl ">Description</h1>
          <p className="text-sm">
            This is a course about React. It is a popular front-end framework
            used for building user interfaces . It is known for its simplicity
            and flexibility.
          </p>
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>
                Course content will be updated soon
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[1, 2, 3].map((_, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm">
                  <span>
                    {true ? <PlayCircle size={14} /> : <Lock size={14} />}
                  </span>
                  <p>Lecture title</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4">Video coming soon</div>
              <h1>Lecture title</h1>
              <Separator className="my-2 " />
              <h1 className="text-lg md:text-xl font-semibold">Course price</h1>
            </CardContent>
            <CardFooter>
              {
                purchasedCourse ? (
                  <Button>continue Course</Button>
                ) : (
                  <Button>Purchase Course</Button>
                )
              }

            </CardFooter>

          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
