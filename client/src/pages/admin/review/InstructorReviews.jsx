import React, { useState } from "react";
import { useGetInstructorReviewsQuery, useReplyToReviewMutation } from "@/features/api/reviewApi";
import { toast } from "sonner";

const InstructorReviews = () => {
  const { data, isLoading, isError } = useGetInstructorReviewsQuery();
  const [replyToReview] = useReplyToReviewMutation();
  const [replyInputs, setReplyInputs] = useState({});

  const handleReplyChange = (id, value) => {
    setReplyInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleReplySubmit = async (reviewId) => {
    try {
      await replyToReview({ reviewId, reply: replyInputs[reviewId] }).unwrap();
      toast.success("Reply sent!");
      setReplyInputs((prev) => ({ ...prev, [reviewId]: "" }));
    } catch (error) {
      toast.error("Failed to send reply.");
    }
  };

  if (isLoading) return <p>Loading reviews...</p>;
  if (isError) return <p>Failed to load reviews.</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Student Reviews</h2>
      {data?.reviews?.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        data.reviews.map((review) => (
          <div key={review._id} className="bg-white dark:bg-gray-900 shadow rounded-xl p-4">
            <div className="mb-2">
              <p className="font-medium text-lg">{review.student.name}</p>
              <p className="text-sm text-gray-500">Rating: {review.rating} ⭐</p>
              <p className="mt-1">{review.comment}</p>
            </div>

            {review.reply ? (
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded mt-2">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Your Reply:</strong> {review.reply}
                </p>
              </div>
            ) : (
              <div className="mt-2 space-y-2">
                <textarea
                  rows={2}
                  placeholder="Write your reply..."
                  value={replyInputs[review._id] || ""}
                  onChange={(e) => handleReplyChange(review._id, e.target.value)}
                  className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
                />
                <button
                  onClick={() => handleReplySubmit(review._id)}
                  className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 transition"
                >
                  Send Reply
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default InstructorReviews;
