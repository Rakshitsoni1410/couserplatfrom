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
import { useEditLectureMutation, useRemoveLectureMutation } from "@/features/api/courseApi";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const MEDIA_API = "http://localhost:8008/api/v1/media";

const LectureTab = () => {
  const [title, setTitle] = useState("");
  const [uploadVideInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const { courseId, lectureId } = useParams();

  const [editLecture, { data, isLoading, error, isSuccess }] = useEditLectureMutation();
  const [removeLecture, { data: removeData, isLoading: removeLoading, isSuccess: removeSuccess }] = useRemoveLectureMutation();

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
          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });
          setBtnDisabled(false);
          toast.success(res.data.message || "Video uploaded successfully");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to upload video");
      } finally {
        setMediaProgress(false);
      }
    }
  };

  const editLectureHandler = async () => {
    if (!title.trim() || !uploadVideInfo) {
      toast.error("Title and video are required!");
      return;
    }

    await editLecture({
      lectureTitle: title,
      videoInfo: uploadVideInfo,
      courseId,
      lectureId,
      isPreviewFree: isFree,
    });
  };

  const removeLectureHandler = async () => {
    if (!lectureId) {
      toast.error("Lecture ID is missing");
      return;
    }

    await removeLecture({ courseId, lectureId });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Lecture updated successfully");
    }
    if (error) {
      toast.error(error?.data?.message || "Failed to update lecture");
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (removeSuccess) {
      toast.success(removeData?.message || "Lecture removed successfully");
    }
  }, [removeSuccess, removeData]);

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>Make changes to the lecture details</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="destructive"
            onClick={removeLectureHandler}
            disabled={!lectureId || removeLoading} // Prevent removal if lectureId is missing
          >
            {removeLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Remove lecture"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            placeholder="Ex: Introduction to Python"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="my-5">
          <Label>
            Video <span className="text-red-500">*</span>
          </Label>
          <Input type="file" accept="video/*" onChange={fileChangeHandler} className="w-fit" />
        </div>

        <div className="flex items-center space-x-2 my-5">
          <Switch id="airplane-mode" checked={isFree} onCheckedChange={setIsFree} />
          <Label htmlFor="airplane-mode">Is this video free?</Label>
        </div>

        {mediaProgress && (
          <div className="my-4">
            <Progress value={uploadProgress} max={100} />
            <p>{uploadProgress}% uploaded</p>
          </div>
        )}

        <div className="mt-4">
          <Button onClick={editLectureHandler} disabled={btnDisabled || isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : "Update Lecture"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
