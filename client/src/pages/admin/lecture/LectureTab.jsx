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

import {
  useEditLectureMutation,
  useRemoveLectureMutation,
  useGetLectureByIdQuery,
} from "@/features/api/courseApi";

import axios from "axios";

import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { toast } from "sonner";

import {
  Loader2,
  UploadCloud,
  Trash2,
  Video,
  ShieldCheck,
} from "lucide-react";

const MEDIA_API = `${import.meta.env.VITE_API_URL}/media`;

const LectureTab = () => {
  const [title, setTitle] = useState("");

  const [uploadVideInfo, setUploadVideoInfo] =
    useState(null);

  const [isFree, setIsFree] = useState(false);

  const [mediaProgress, setMediaProgress] =
    useState(false);

  const [uploadProgress, setUploadProgress] =
    useState(0);

  const [btnDisabled, setBtnDisabled] =
    useState(true);

  const { courseId, lectureId } = useParams();

  const { data: lectureData } =
    useGetLectureByIdQuery(lectureId);

  useEffect(() => {
    if (lectureData) {
      setTitle(lectureData.lectureTitle);

      setIsFree(lectureData.isPreviewFree);

      setUploadVideoInfo(lectureData.videoInfo);

      if (lectureData.videoInfo) {
        setBtnDisabled(false);
      }
    }
  }, [lectureData]);

  const [
    editLecture,
    {
      data,
      isLoading,
      error,
      isSuccess,
    },
  ] = useEditLectureMutation();

  const [
    removeLecture,
    {
      data: removeData,
      isLoading: removeLoading,
      isSuccess: removeSuccess,
    },
  ] = useRemoveLectureMutation();

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();

      formData.append("file", file);

      setMediaProgress(true);

      try {
        const res = await axios.post(
          `${MEDIA_API}/upload-video`,
          formData,
          {
            onUploadProgress: ({
              loaded,
              total,
            }) => {
              setUploadProgress(
                Math.round((loaded * 100) / total)
              );
            },
          }
        );

        if (res.data.success) {
          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });

          setBtnDisabled(false);

          toast.success(
            res.data.message ||
              "Video uploaded successfully"
          );
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
      toast.error(
        "Title and video are required!"
      );

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

    await removeLecture({
      courseId,
      lectureId,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        data?.message ||
          "Lecture updated successfully"
      );
    }

    if (error) {
      toast.error(
        error?.data?.message ||
          "Failed to update lecture"
      );
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (removeSuccess) {
      toast.success(
        removeData?.message ||
          "Lecture removed successfully"
      );
    }
  }, [removeSuccess, removeData]);

  return (
    <Card className="bg-slate-900/70 border border-slate-800 backdrop-blur-xl rounded-3xl shadow-2xl text-white">

      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 border-b border-slate-800 pb-6">

        <div>
          <CardTitle className="text-2xl flex items-center gap-3">
            <Video className="text-indigo-400 w-7 h-7" />
            Edit Lecture
          </CardTitle>

          <CardDescription className="text-slate-400 mt-2">
            Update lecture title, upload video,
            and manage preview settings.
          </CardDescription>
        </div>

        <Button
          variant="destructive"
          onClick={removeLectureHandler}
          disabled={!lectureId || removeLoading}
          className="rounded-xl"
        >
          {removeLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <>
              <Trash2 className="mr-2 h-4 w-4" />
              Remove Lecture
            </>
          )}
        </Button>
      </CardHeader>

      <CardContent className="space-y-8 pt-8">

        {/* TITLE */}
        <div className="space-y-3">

          <Label className="text-slate-300">
            Lecture Title
          </Label>

          <Input
            type="text"
            placeholder="Ex: Introduction to React"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="h-12 bg-slate-950 border-slate-700 text-white placeholder:text-slate-500 rounded-xl focus-visible:ring-indigo-500"
          />
        </div>

        {/* VIDEO UPLOAD */}
        <div className="space-y-4">

          <Label className="text-slate-300">
            Upload Video
          </Label>

          <div className="border-2 border-dashed border-slate-700 hover:border-indigo-500 transition-all duration-300 rounded-2xl p-8 bg-slate-950/50">

            <div className="flex flex-col items-center justify-center text-center">

              <div className="h-16 w-16 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4">

                <UploadCloud className="w-8 h-8 text-indigo-400" />

              </div>

              <h3 className="text-lg font-semibold">
                Upload Lecture Video
              </h3>

              <p className="text-sm text-slate-400 mt-1 mb-5">
                Drag & drop or select your video
              </p>

              <Input
                type="file"
                accept="video/*"
                onChange={fileChangeHandler}
                className="max-w-sm cursor-pointer bg-slate-900 border-slate-700"
              />
            </div>
          </div>
        </div>

        {/* PROGRESS */}
        {mediaProgress && (
          <div className="space-y-3">

            <div className="flex justify-between text-sm">
              <span className="text-slate-300">
                Uploading Video...
              </span>

              <span className="text-indigo-400 font-semibold">
                {uploadProgress}%
              </span>
            </div>

            <Progress
              value={uploadProgress}
              max={100}
              className="h-3 rounded-full"
            />
          </div>
        )}

        {/* FREE PREVIEW */}
        <div className="flex items-center justify-between bg-slate-950 border border-slate-800 rounded-2xl p-5">

          <div className="flex items-center gap-4">

            <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center">

              <ShieldCheck className="text-green-400" />

            </div>

            <div>
              <h3 className="font-semibold text-white">
                Free Preview
              </h3>

              <p className="text-sm text-slate-400">
                Allow students to watch this
                lecture for free.
              </p>
            </div>
          </div>

          <Switch
            checked={isFree}
            onCheckedChange={setIsFree}
          />
        </div>

        {/* UPDATE BUTTON */}
        <div className="pt-4">

          <Button
            onClick={editLectureHandler}
            disabled={btnDisabled || isLoading}
            className="w-full md:w-fit h-12 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-base"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Lecture"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;