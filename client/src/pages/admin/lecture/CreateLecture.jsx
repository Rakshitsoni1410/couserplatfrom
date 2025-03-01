import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateLectureMutation } from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const params = useParams();
  const courseId = params.courseId;

  const navigate = useNavigate();
  const [createLecture, { isLoading, isSuccess, error, data }] = useCreateLectureMutation();

  const createLectureHandler = async () => {
    if (!lectureTitle.trim()) {
      toast.error("Lecture title cannot be empty!");
      return;
    }
  
    try {
      const response = await createLecture({ lectureTitle, courseId }).unwrap();
      toast.success(response.message || "Lecture created successfully!");
      navigate(`/admin/course/${courseId}`);
    } catch (err) {
      toast.error(err.data?.message || "Failed to create lecture.");
    }
  };
  

  useEffect(() => {
    if (isSuccess && data) {
      toast.success(data.message);
    }
    if (error?.data?.message) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error, data]);

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Let's add a course, add some basic details for your new lecture.
        </h1>
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, laborum!
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Your title Name"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/course/${courseId}`)}
          >
            Back to Course
          </Button>
          <Button disabled={isLoading} onClick={createLectureHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create Lecture"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
