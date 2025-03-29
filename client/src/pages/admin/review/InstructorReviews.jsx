import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetInstructorReviewsQuery, useReplyToReviewMutation } from "@/features/api/reviewApi";
import { toast } from "sonner";

const Reviews = () => {
  const { courseId } = useParams(); // If present, fetch course-specific reviews
  const { user } = useSelector((state) => state.auth);
  const instructorId = user?._id;

  // Fetch reviews (all instructor reviews OR specific course reviews)
  const { data, isLoading, isError } = useGetInstructorReviewsQuery({ courseId });
  const [replyToReview] = useReplyToReviewMutation();
  const [replyInputs, setReplyInputs] = useState({});

  if (isLoading) return <p>Loading reviews...</p>;
  if (isError || !data?.success) {
    toast.error("Could not fetch reviews.");
    return <p>Failed to load reviews.</p>;
  }

  const reviews = data.reviews;

  const handleReplyChange = (reviewId, value) => {
    setReplyInputs((prev) => ({ ...prev, [reviewId]: value }));
  };

  const handleReplySubmit = async (reviewId) => {
    try {
      await replyToReview({ reviewId, reply: replyInputs[reviewId] }).unwrap();
      toast.success("Reply submitted!");
      setReplyInputs((prev) => ({ ...prev, [reviewId]: "" }));
    } catch (error) {
      toast.error("Failed to submit reply.");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">
        {courseId ? "Course Reviews" : "All Instructor Reviews"}
      </h2>

      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} className="bg-white shadow-md rounded-lg p-4">
            <p className="font-medium">{review.student?.name}</p>
            <p className="text-sm text-gray-500">Rating: {review.rating} ⭐</p>
            <p className="mt-1">{review.comment}</p>

            {/* ✅ Show instructor reply if exists */}
            {review.reply ? (
              <div className="bg-gray-100 p-3 rounded mt-2">
                <p className="text-sm text-gray-600">
                  <strong>Instructor Reply:</strong> {review.reply}
                </p>
              </div>
            ) : (
              // ✅ Only show reply box if user is instructor
              instructorId && (
                <div className="mt-3 space-y-2">
                  <textarea
                    rows={2}
                    placeholder="Write a reply..."
                    value={replyInputs[review._id] || ""}
                    onChange={(e) => handleReplyChange(review._id, e.target.value)}
                    className="w-full border rounded-md p-2"
                  />
                  <button
                    onClick={() => handleReplySubmit(review._id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded"
                  >
                    Submit Reply
                  </button>
                </div>
              )
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Reviews;
