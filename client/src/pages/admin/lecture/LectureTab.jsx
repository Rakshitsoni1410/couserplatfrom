import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { useEditLectureMutation } from "@/features/api/courseApi";
import axios from "axios";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
const MEDIA_API = "http://localhost:8008/api/v1/media";
const LectureTab = () => {
  const [title, setTitle] = useState("");
  const [uploadVideInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const params = useParams();
  const { courseId, lectureId } = params;
  const [editLecture, { data, isLoading, error, isSuccess }] = useEditLectureMutation()

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });
        if (res.data.success) {
          console.log(res);
          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });
          setBtnDisabled(false);
          toast.success(res.data.message || "viedo upload succesfully");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to upload video");
      } finally {
        setMediaProgress(false);
      }
    }
  };
  const editLectureHandler = async () => {
    await editLecture({
      lectureTitle,
      videoInfo: uploadVideInfo,
      courseId,
      lectureId,
      isPreview: isFree
    });
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);

    } if (error) {
      toast.error(error.data.message)
    }
  }, [isSuccess, error])
  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>Make changes to the lecture details</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="destructive">Remove lecture</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <Label>Title</Label>
          <Input type="text" placeholder="Ex: Introduction to python" />
        </div>
        <div className="my-5">
          <Label>
            video <span className="text-red-500"> *</span>
          </Label>
          <Input
            type="file"
            accept="video/*"
            onChange={fileChangeHandler}
            placeholder="Ex: Introduction to python"
            className="w-fit"
          />
        </div>
        <div className="flex items-center space-x-2 my-5">
          <Switch id="airplane-mode" />
          <Label htmlFor="airplane-mode"> IS this video free</Label>
        </div>
        {mediaProgress && (
          <div className="my-4">
            <Progress value={uploadProgress} max={100} />
            <p>{uploadProgress}% uploaded</p>
          </div>
        )}
        <div className="mt-4 ">
          <Button onClick={editLectureHandler}>Update Lecture</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
