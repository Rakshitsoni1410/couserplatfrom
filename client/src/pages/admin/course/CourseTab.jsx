import { Button } from "@/components/ui/button";

import RichTextEditor from "@/components/ui/RichTextEditor";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
  usePublishCourseMutation,
} from "@/features/api/courseApi";

import {
  Loader2,
  BookOpen,
  UploadCloud,
  Sparkles,
  Globe,
  Eye,
} from "lucide-react";

import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { toast } from "sonner";

const categories = [
  "Next JS",
  "Data Science",
  "Frontend Development",
  "Fullstack Development",
  "MERN Stack Development",
  "Javascript",
  "Python",
  "Docker",
  "MongoDB",
  "HTML",
];

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

  const [previewThumbnail, setPreviewThumbnail] =
    useState("");

  const { courseId } = useParams();

  const navigate = useNavigate();

  const {
    data: courseByIdData,
    isLoading: courseByIdLoading,
    refetch,
  } = useGetCourseByIdQuery(courseId);

  const [
    publishCourse,
  ] = usePublishCourseMutation();

  const [
    editCourse,
    {
      data,
      isLoading,
      isSuccess,
      error,
    },
  ] = useEditCourseMutation();

  useEffect(() => {
    if (courseByIdData?.course) {
      const course = courseByIdData.course;

      setInput({
        courseTitle: course.courseTitle,
        subTitle: course.subTitle,
        description: course.description,
        category: course.category,
        courseLevel: course.courseLevel,
        coursePrice: course.coursePrice,
        courseThumbnail: "",
      });
    }
  }, [courseByIdData]);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setInput({
        ...input,
        courseThumbnail: file,
      });

      const fileReader = new FileReader();

      fileReader.onloadend = () =>
        setPreviewThumbnail(fileReader.result);

      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    const formData = new FormData();

    formData.append(
      "courseTitle",
      input.courseTitle
    );

    formData.append(
      "subTitle",
      input.subTitle
    );

    formData.append(
      "description",
      input.description
    );

    formData.append(
      "category",
      input.category
    );

    formData.append(
      "courseLevel",
      input.courseLevel
    );

    formData.append(
      "coursePrice",
      input.coursePrice
    );

    formData.append(
      "courseThumbnail",
      input.courseThumbnail
    );

    await editCourse({
      formData,
      courseId,
    });
  };

  const publishStatusHandler = async (
    action
  ) => {
    try {
      const response = await publishCourse({
        courseId,
        query: action,
      });

      if (response.data) {
        refetch();

        toast.success(
          response.data.message
        );
      }
    } catch (error) {
      toast.error(
        "Failed to publish course"
      );
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        data?.message ||
          "Course updated successfully"
      );
    }

    if (error) {
      toast.error(
        error?.data?.message ||
          "Failed to update course"
      );
    }
  }, [isSuccess, error]);

  if (courseByIdLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white p-4 md:p-8">

      <div className="max-w-6xl mx-auto">

        <Card className="bg-slate-900/70 border border-slate-800 backdrop-blur-xl rounded-3xl shadow-2xl">

          {/* HEADER */}
          <CardHeader className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 border-b border-slate-800 pb-8">

            <div>

              <div className="flex items-center gap-3 mb-3">

                <div className="h-14 w-14 rounded-2xl bg-indigo-600/15 border border-indigo-500/20 flex items-center justify-center">

                  <BookOpen className="text-indigo-400 w-7 h-7" />

                </div>

                <div>
                  <CardTitle className="text-3xl">
                    Edit Course
                  </CardTitle>

                  <CardDescription className="text-slate-400 mt-2">
                    Manage your course details,
                    thumbnail, pricing and
                    publishing.
                  </CardDescription>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap items-center gap-3">

              <Button
                variant="outline"
                disabled={
                  courseByIdData?.course
                    .lectures.length === 0
                }
                onClick={() =>
                  publishStatusHandler(
                    courseByIdData?.course
                      .isPublished
                      ? "false"
                      : "true"
                  )
                }
                className="border-slate-700 bg-slate-950 hover:bg-slate-800 text-white rounded-xl"
              >
                <Globe className="mr-2 h-4 w-4" />

                {courseByIdData?.course
                  .isPublished
                  ? "Unpublish"
                  : "Publish"}
              </Button>

              <Button
                variant="destructive"
                className="rounded-xl"
              >
                Remove Course
              </Button>
            </div>
          </CardHeader>

          <CardContent className="pt-8">

            <div className="space-y-8">

              {/* BADGE */}
              <div className="flex items-center gap-2 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 px-4 py-2 rounded-full w-fit text-sm">

                <Sparkles size={16} />

                Professional Course Editor

              </div>

              {/* TITLE */}
              <div className="space-y-3">

                <Label className="text-slate-300">
                  Course Title
                </Label>

                <Input
                  type="text"
                  name="courseTitle"
                  value={input.courseTitle}
                  onChange={changeEventHandler}
                  placeholder="Ex: Complete MERN Stack Course"
                  className="h-12 bg-slate-950 border-slate-700 text-white rounded-xl placeholder:text-slate-500 focus-visible:ring-indigo-500"
                />
              </div>

              {/* SUBTITLE */}
              <div className="space-y-3">

                <Label className="text-slate-300">
                  Subtitle
                </Label>

                <Input
                  type="text"
                  name="subTitle"
                  value={input.subTitle}
                  onChange={changeEventHandler}
                  placeholder="Ex: Become a Fullstack Developer"
                  className="h-12 bg-slate-950 border-slate-700 text-white rounded-xl placeholder:text-slate-500 focus-visible:ring-indigo-500"
                />
              </div>

              {/* DESCRIPTION */}
              <div className="space-y-3">

                <Label className="text-slate-300">
                  Course Description
                </Label>

                <div className="bg-slate-950 border border-slate-700 rounded-2xl overflow-hidden">

                  <RichTextEditor
                    input={input}
                    setInput={setInput}
                  />

                </div>
              </div>

              {/* GRID */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* CATEGORY */}
                <div className="space-y-3">

                  <Label className="text-slate-300">
                    Category
                  </Label>

                  <Select
                    defaultValue={input.category}
                    onValueChange={(value) =>
                      setInput({
                        ...input,
                        category: value,
                      })
                    }
                  >
                    <SelectTrigger className="h-12 bg-slate-950 border-slate-700 rounded-xl text-white">

                      <SelectValue placeholder="Select category" />

                    </SelectTrigger>

                    <SelectContent className="bg-slate-900 border-slate-700 text-white">

                      <SelectGroup>

                        <SelectLabel>
                          Categories
                        </SelectLabel>

                        {categories.map(
                          (
                            category,
                            index
                          ) => (
                            <SelectItem
                              key={index}
                              value={category}
                            >
                              {category}
                            </SelectItem>
                          )
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* LEVEL */}
                <div className="space-y-3">

                  <Label className="text-slate-300">
                    Course Level
                  </Label>

                  <Select
                    defaultValue={
                      input.courseLevel
                    }
                    onValueChange={(value) =>
                      setInput({
                        ...input,
                        courseLevel: value,
                      })
                    }
                  >
                    <SelectTrigger className="h-12 bg-slate-950 border-slate-700 rounded-xl text-white">

                      <SelectValue placeholder="Select level" />

                    </SelectTrigger>

                    <SelectContent className="bg-slate-900 border-slate-700 text-white">

                      <SelectGroup>

                        <SelectLabel>
                          Level
                        </SelectLabel>

                        <SelectItem value="Beginner">
                          Beginner
                        </SelectItem>

                        <SelectItem value="Medium">
                          Medium
                        </SelectItem>

                        <SelectItem value="Advance">
                          Advance
                        </SelectItem>

                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* PRICE */}
                <div className="space-y-3">

                  <Label className="text-slate-300">
                    Price (INR)
                  </Label>

                  <Input
                    type="number"
                    name="coursePrice"
                    value={input.coursePrice}
                    onChange={
                      changeEventHandler
                    }
                    placeholder="1999"
                    className="h-12 bg-slate-950 border-slate-700 rounded-xl text-white placeholder:text-slate-500"
                  />
                </div>
              </div>

              {/* THUMBNAIL */}
              <div className="space-y-4">

                <Label className="text-slate-300">
                  Course Thumbnail
                </Label>

                <div className="border-2 border-dashed border-slate-700 hover:border-indigo-500 transition-all duration-300 rounded-3xl p-8 bg-slate-950/50">

                  <div className="flex flex-col items-center justify-center text-center">

                    <div className="h-16 w-16 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4">

                      <UploadCloud className="w-8 h-8 text-indigo-400" />

                    </div>

                    <h3 className="text-lg font-semibold">
                      Upload Thumbnail
                    </h3>

                    <p className="text-sm text-slate-400 mt-1 mb-5">
                      PNG, JPG, WEBP supported
                    </p>

                    <Input
                      type="file"
                      onChange={
                        selectThumbnail
                      }
                      accept="image/*"
                      className="max-w-sm cursor-pointer bg-slate-900 border-slate-700"
                    />
                  </div>
                </div>

                {/* PREVIEW */}
                {previewThumbnail && (
                  <div className="relative mt-6 rounded-3xl overflow-hidden border border-slate-800">

                    <img
                      src={previewThumbnail}
                      alt="Thumbnail Preview"
                      className="w-full h-[300px] object-cover"
                    />

                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 text-sm">

                      <Eye size={16} />

                      Preview

                    </div>
                  </div>
                )}
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">

                <Button
                  onClick={() =>
                    navigate(
                      "/admin/course"
                    )
                  }
                  variant="outline"
                  className="w-full sm:w-fit border-slate-700 bg-slate-950 hover:bg-slate-800 text-white rounded-xl"
                >
                  Cancel
                </Button>

                <Button
                  disabled={isLoading}
                  onClick={
                    updateCourseHandler
                  }
                  className="w-full sm:w-fit bg-indigo-600 hover:bg-indigo-700 rounded-xl h-12 px-8 text-base"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CourseTab;