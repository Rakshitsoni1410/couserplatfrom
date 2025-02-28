import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/ui/RichTextEditor";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";

import { Loader2 } from "lucide-react";
import "react-quill/dist/quill.snow.css";
import { useEditCourseMutation, useGetCourseByIdQuery } from "@/features/api/courseApi";

const CourseTab = () => {
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });
  const params = useParams();
  const courseId = params.courseId;
  const{data:courseByIdData,isLoading:courseByIdLoading}= useGetCourseByIdQuery(courseId);
  const course = courseByIdData?.course;
  useEffect(()=>{
    if(course){
      setInput({
        courseTitle:course.courseTitle,
        subTitle:course.subTitle,
        description:course.description,
        category:course.category,
        courseLevel:course.courseLevel,
        coursePrice:course.coursePrice,
        courseThumbnail:"",
      });
    }
  },[course])
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const navigate = useNavigate();
 
  const [editCourse, { data, isLoading, isSuccess, error }] =
    useEditCourseMutation();

  // Handle Input Changes
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  // Select Dropdown Handlers
  const selectCategory = (value) =>
    setInput((prev) => ({ ...prev, category: value }));
  const selectCourseLevel = (value) =>
    setInput((prev) => ({ ...prev, courseLevel: value }));

  // Handle Thumbnail Upload
  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput((prev) => ({ ...prev, courseThumbnail: file }));
      const fileReader = new FileReader();
      fileReader.onload = (event) => setPreviewThumbnail(event.target.result);
      fileReader.readAsDataURL(file);
    }
  };

  // Update Course Handler
  const updateCourseHandler = async () => {
    if (!input.courseTitle || !input.category || !input.courseLevel) {
      return toast.error("Please fill all required fields!");
    }

    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) =>
      formData.append(key, value)
    );

    await editCourse({ courseId, formData });
  };

  // Toast Notifications
  useEffect(() => {
    if (isSuccess)
      toast.success(data?.message || "Course updated successfully");
    if (error) toast.error(error?.data?.message || "Failed to update course");
  }, [isSuccess, error, data]);

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes to the course here. Click save when you're done.
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button variant="outline">
            {input.isPublished ? "Unpublish" : "Publish"}
          </Button>
          <Button variant="destructive">Remove Course</Button>
        </div>
      </CardHeader>

      <CardContent>
        {/* Course Title */}
        <div className="space-y-4 mt-5">
          <Label>Title *</Label>
          <Input
            type="text"
            name="courseTitle"
            value={input.courseTitle}
            onChange={changeEventHandler}
            placeholder="Ex. Fullstack Developer"
          />
        </div>

        {/* Subtitle */}
        <div>
          <Label>Subtitle</Label>
          <Input
            type="text"
            name="subTitle"
            value={input.subTitle}
            onChange={changeEventHandler}
            placeholder="Ex. Learn fullstack development in 60 days"
          />
        </div>

        {/* Description */}
        <div>
          <Label>Description</Label>
          <RichTextEditor input={input} setInput={setInput} />
        </div>

        {/* Category, Level, and Price */}
        <div className="flex items-center gap-5">
          {/* Category */}
          <div>
            <Label>Category *</Label>
            <Select onValueChange={selectCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="Next JS">Next JS</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                  <SelectItem value="Frontend Development">
                    Frontend Development
                  </SelectItem>
                  <SelectItem value="Fullstack Development">
                    Fullstack Development
                  </SelectItem>
                  <SelectItem value="MERN Stack Development">
                    MERN Stack Development
                  </SelectItem>
                  <SelectItem value="Javascript">Javascript</SelectItem>
                  <SelectItem value="Python">Python</SelectItem>
                  <SelectItem value="Docker">Docker</SelectItem>
                  <SelectItem value="MongoDB">MongoDB</SelectItem>
                  <SelectItem value="HTML">HTML</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Course Level */}
          <div>
            <Label>Course Level *</Label>
            <Select onValueChange={selectCourseLevel}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a course level" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Course Level</SelectLabel>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Advance">Advance</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Course Price */}
          <div>
            <Label>Price (INR)</Label>
            <Input
              type="number"
              name="coursePrice"
              value={input.coursePrice}
              onChange={changeEventHandler}
              placeholder="199"
              className="w-fit"
            />
          </div>
        </div>

        {/* Course Thumbnail */}
        <div>
          <Label>Course Thumbnail</Label>
          <Input
            type="file"
            onChange={selectThumbnail}
            accept="image/*"
            className="w-fit"
          />
          {previewThumbnail && (
            <img
              src={previewThumbnail}
              className="w-40 my-2"
              alt="Course Thumbnail"
            />
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-4">
          <Button onClick={() => navigate("/admin/course")} variant="outline">
            Cancel
          </Button>
          <Button disabled={isLoading} onClick={updateCourseHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </CardContent>

      {/* Toast Notifications */}
    </Card>
  );
};

export default CourseTab;
