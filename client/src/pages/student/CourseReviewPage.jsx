import React from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "./ReviewForm"; // adjust the path if needed
import { useGetCourseReviewsQuery } from "@/features/api/reviewApi";

const CourseReviewPage = () => {
  const { courseId } = useParams();

  const { data, isLoading, error } = useGetCourseReviewsQuery(courseId);
  const reviews = data?.reviews || [];
  const instructorId = data?.instructorId;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      <h1 className="text-2xl font-bold">Course Reviews</h1>

      {/* ✅ Review Form */}
      <ReviewForm courseId={courseId} instructorId={instructorId} />

      {/* ✅ Review List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">All Reviews</h2>
        {isLoading ? (
          <p>Loading reviews...</p>
        ) : error ? (
          <p className="text-red-500">Error loading reviews</p>
        ) : reviews.length === 0 ? (
          <p>No reviews yet. Be the first to write one!</p>
        ) : (
          <ul className="space-y-4">
            {reviews.map((r) => (
              <li
                key={r._id}
                className="border p-4 rounded-lg dark:border-gray-700 dark:bg-gray-900"
              >
                <div className="font-semibold text-lg">⭐ {r.rating} Stars</div>
                <p className="text-gray-800 dark:text-white">{r.comment}</p>
                {r.reply && (
                  <p className="text-sm text-blue-600 mt-2">
                    💬 Instructor replied: {r.reply}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CourseReviewPage;
