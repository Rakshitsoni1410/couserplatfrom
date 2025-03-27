import React, { useState } from "react";
import { useAddReviewMutation } from "@/features/api/reviewApi"; // Update path if needed
import { toast } from "sonner";

const ReviewForm = ({ courseId, instructorId }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [addReview, { isLoading }] = useAddReviewMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addReview({
        course: courseId,
        instructor: instructorId,
        rating,
        comment,
      }).unwrap();
      toast.success(res.message || "Review submitted successfully!");
      setRating(5);
      setComment("");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to submit review.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md max-w-md w-full"
    >
      <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>

      {/* Rating */}
      <label className="block text-sm font-medium mb-1">Rating</label>
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="w-full p-2 border rounded-md mb-4 dark:bg-gray-800 dark:text-white"
      >
        {[5, 4, 3, 2, 1].map((val) => (
          <option key={val} value={val}>
            {val} Star{val !== 1 && "s"}
          </option>
        ))}
      </select>

      {/* Comment */}
      <label className="block text-sm font-medium mb-1">Comment</label>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
        placeholder="Write your feedback..."
        className="w-full p-2 border rounded-md mb-4 dark:bg-gray-800 dark:text-white"
      ></textarea>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
      >
        {isLoading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;
