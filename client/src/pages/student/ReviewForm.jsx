import React, { useState } from "react";
import { useAddReviewMutation } from "@/features/api/reviewApi";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { useParams } from "react-router-dom";

const ReviewForm = ({ courseId, instructorId }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [addReview, { isLoading }] = useAddReviewMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!courseId || !instructorId) {
      toast.error("Course or Instructor ID is missing.");
      return;
    }

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
      className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 max-w-xl mx-auto space-y-6"
    >
      <div className="flex items-center space-x-2 mb-2">
        <Star className="text-yellow-500" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Leave a Review
        </h2>
      </div>

      {/* Rating */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Rating
        </label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {[5, 4, 3, 2, 1].map((val) => (
            <option key={val} value={val}>
              {Array(val).fill("⭐").join(" ")} ({val})
            </option>
          ))}
        </select>
      </div>

      {/* Comment */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Comment
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={5}
          placeholder="Share your experience..."
          className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
      >
        {isLoading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;
