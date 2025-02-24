import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCreateCourseMutation } from "@/features/api/courseApi"; // ✅ Correct import

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");
  
  const { data, isLoading } = useCreateCourseMutation(); // ✅ Fetch Courses
  const navigate = useNavigate();

  const CourseTable =()=>{
    const {data,isLoading}= useGetCreatorCoursesQuery();
  }

  // ✅ Placeholder function for course creation
  const createCourseHandler = async () => {
    console.log("Creating course:", { courseTitle, category });
  };

  if (isLoading) return <h1>Loading...</h1>;
 console.log("data ->".data);
 
  return (
    <div>
      <Button onClick={() => navigate("create")}>Create a new course</Button>
      <Table>
        <TableCaption>A list of your recent courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((course) => (
            <TableRow key={course._id}>
              <TableCell>${course.coursePrice || "Free"}</TableCell>
              <TableCell>
                <Badge>{course.isPublished ? "Published" : "Draft"}</Badge>
              </TableCell>
              <TableCell>{course.courseTitle}</TableCell>
              <TableCell className="text-right">
                <Button
                  onClick={() => navigate(`/admin/course/${course._id}`)}
                  variant="outline"
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">
              ${data?.reduce((acc, course) => acc + (course.coursePrice || 0), 0)}
            </TableCell>
          </TableRow>
        </TableFooter>  
      </Table>
    </div>
  );
};

export default AddCourse; // ✅ Export matches component name
