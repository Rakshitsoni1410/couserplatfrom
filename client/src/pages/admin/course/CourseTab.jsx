import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/ui/RichTextEditor";
import { useParams } from "react-router-dom";
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { useEditCourseMutation } from "@/features/api/courseApi";

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
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const courseId = params.courseId;
  const [editCourse, { data, isLoading, isSuccess, error }] =
    useEditCourseMutation();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };

  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onload = (event) => setPreviewThumbnail(event.target.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);

    await editCourse({ courseId, formData });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course updated successfully");
    }
    if (error) {
      toast.error(error?.data?.message || "Failed to update course");
    }
  }, [isSuccess, error, data]);

  const isPublished = false;

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
            {isPublished ? "Unpublished" : "Publish"}
          </Button>
          <Button>Remove Course</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5">
          <Label>Title</Label>
          <Input
            type="text"
            name="courseTitle"
            value={input.courseTitle}
            onChange={changeEventHandler}
            placeholder="Ex. Fullstack Developer"
          />
        </div>
        <div>
          <Label>Subtitle</Label>
          <Input
            type="text"
            name="subTitle"
            value={input.subTitle}
            onChange={changeEventHandler}
            placeholder="Ex. Become a Fullstack Developer from zero to hero in 60 days"
          />
        </div>
        <div>
          <Label>Description</Label>
          <RichTextEditor input={input} setInput={setInput} />
        </div>
        <div className="flex items-center gap-5">
          <div>
            <Label>Category</Label>
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

          <div>
            <Label>Course Level</Label>
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
          <div>
            <Label>
              Price in (INR)
              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={changeEventHandler}
                placeholder="199"
                className="w-fit"
              />
            </Label>
          </div>
        </div>
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
        <div>
          <Button onClick={() => navigate("/admin/course")} variant="outline">
            Cancel
          </Button>
          <Button disabled={isLoading} onClick={updateCourseHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
