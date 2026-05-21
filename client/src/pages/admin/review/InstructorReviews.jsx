import React, { useState } from "react";

import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import {
  useGetInstructorReviewsQuery,
  useReplyToReviewMutation,
} from "@/features/api/reviewApi";

import { toast } from "sonner";

import {
  Star,
  MessageSquare,
  Send,
  Loader2,
  UserCircle2,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const Reviews = () => {
  const { courseId } = useParams();

  const { user } = useSelector(
    (state) => state.auth
  );

  const instructorId = user?._id;

  const {
    data,
    isLoading,
    isError,
  } = useGetInstructorReviewsQuery({
    courseId,
  });

  const [
    replyToReview,
    { isLoading: replyLoading },
  ] = useReplyToReviewMutation();

  const [replyInputs, setReplyInputs] =
    useState({});

  const handleReplyChange = (
    reviewId,
    value
  ) => {
    setReplyInputs((prev) => ({
      ...prev,
      [reviewId]: value,
    }));
  };

  const handleReplySubmit = async (
    reviewId
  ) => {
    if (!replyInputs[reviewId]?.trim()) {
      return toast.error(
        "Reply cannot be empty"
      );
    }

    try {
      await replyToReview({
        reviewId,
        reply: replyInputs[reviewId],
      }).unwrap();

      toast.success(
        "Reply submitted successfully!"
      );

      setReplyInputs((prev) => ({
        ...prev,
        [reviewId]: "",
      }));
    } catch (error) {
      toast.error(
        "Failed to submit reply."
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">

        <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />

      </div>
    );
  }

  if (isError || !data?.success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">

        <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-6">

          <p className="text-red-400 text-lg font-semibold">
            Failed to load reviews
          </p>

        </div>
      </div>
    );
  }

  const reviews = data?.reviews || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white p-4 md:p-8">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">

          <div className="flex items-center gap-4 mb-4">

            <div className="h-16 w-16 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">

              <Star className="text-yellow-400 w-8 h-8" />

            </div>

            <div>
              <h1 className="text-4xl font-bold">
                {courseId
                  ? "Course Reviews"
                  : "Instructor Reviews"}
              </h1>

              <p className="text-slate-400 mt-1">
                Read and respond to student
                feedback.
              </p>
            </div>
          </div>

          {/* BADGE */}
          <div className="flex items-center gap-2 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 px-4 py-2 rounded-full w-fit text-sm">

            <Sparkles size={16} />

            Student Feedback Management

          </div>
        </div>

        {/* REVIEWS */}
        {reviews.length === 0 ? (
          <div className="bg-slate-900/70 border border-slate-800 backdrop-blur-xl rounded-3xl p-14 text-center">

            <div className="flex justify-center mb-5">

              <MessageSquare className="w-16 h-16 text-slate-600" />

            </div>

            <h2 className="text-2xl font-semibold text-slate-300">
              No Reviews Yet
            </h2>

            <p className="text-slate-500 mt-2">
              Student reviews will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">

            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-slate-900/70 border border-slate-800 backdrop-blur-xl rounded-3xl p-6 hover:border-indigo-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10"
              >

                {/* TOP */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                  {/* USER */}
                  <div className="flex items-center gap-4">

                    <div className="h-14 w-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">

                      <UserCircle2 className="text-indigo-400 w-8 h-8" />

                    </div>

                    <div>
                      <h3 className="text-lg font-semibold">
                        {review.student?.name ||
                          "Student"}
                      </h3>

                      <div className="flex items-center gap-2 mt-1">

                        {[...Array(review.rating)].map(
                          (_, index) => (
                            <Star
                              key={index}
                              size={16}
                              className="fill-yellow-400 text-yellow-400"
                            />
                          )
                        )}

                        <span className="text-slate-400 text-sm ml-2">
                          {review.rating}/5
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* REVIEW BADGE */}
                  <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm w-fit">

                    Verified Review

                  </div>
                </div>

                {/* COMMENT */}
                <div className="mt-6 bg-slate-950 border border-slate-800 rounded-2xl p-5">

                  <p className="text-slate-300 leading-relaxed">
                    {review.comment}
                  </p>

                </div>

                {/* INSTRUCTOR REPLY */}
                {review.reply ? (
                  <div className="mt-5 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-5">

                    <div className="flex items-center gap-2 mb-2">

                      <MessageSquare
                        size={18}
                        className="text-indigo-400"
                      />

                      <h4 className="font-semibold text-indigo-400">
                        Instructor Reply
                      </h4>
                    </div>

                    <p className="text-slate-300">
                      {review.reply}
                    </p>

                  </div>
                ) : (
                  instructorId && (
                    <div className="mt-6">

                      <label className="text-sm text-slate-400 mb-3 block">
                        Reply to Student
                      </label>

                      <textarea
                        rows={4}
                        placeholder="Write a thoughtful reply..."
                        value={
                          replyInputs[
                            review._id
                          ] || ""
                        }
                        onChange={(e) =>
                          handleReplyChange(
                            review._id,
                            e.target.value
                          )
                        }
                        className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                      />

                      <Button
                        onClick={() =>
                          handleReplySubmit(
                            review._id
                          )
                        }
                        disabled={replyLoading}
                        className="mt-4 bg-indigo-600 hover:bg-indigo-700 rounded-xl h-11 px-6"
                      >
                        {replyLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Submit Reply
                          </>
                        )}
                      </Button>
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;