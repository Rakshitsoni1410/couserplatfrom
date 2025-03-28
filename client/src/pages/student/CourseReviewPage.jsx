import React from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "./ReviewForm";
import { useGetCourseReviewsQuery } from "@/features/api/reviewApi";
import { UserCircle2 } from "lucide-react";

const CourseReviewPage = () => {
  const { courseId } = useParams();

  const { data, isLoading, error } = useGetCourseReviewsQuery(courseId);
  const reviews = data?.reviews || [];
  const instructorId = data?.instructorId;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-8">
      {/* Floating Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          🎓 Course Feedback Wall
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Real voices from real learners. Read or leave a review below.
        </p>
      </div>

      {/* Review Form */}
      <div className="max-w-3xl mx-auto mb-12">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
          <ReviewForm courseId={courseId} instructorId={instructorId} />
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
          🗂️ Student Reviews
        </h2>

        {isLoading ? (
          <p className="text-gray-500 dark:text-gray-300">Loading reviews...</p>
        ) : error ? (
          <p className="text-red-500">Unable to fetch reviews.</p>
        ) : reviews.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No reviews yet. Be the first to share your experience!</p>
        ) : (
          <ul className="relative border-l border-gray-300 dark:border-gray-700 pl-6">
            {reviews.map((r, index) => (
              <li key={r._id} className="mb-10">
                <div className="absolute -left-4 top-1.5 bg-blue-600 rounded-full h-8 w-8 flex items-center justify-center text-white shadow-lg">
                  <UserCircle2 size={18} />
                </div>
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-5 transition hover:shadow-xl">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                      ⭐ {r.rating} / 5
                    </div>
                    <span className="text-sm text-gray-400">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{r.comment}</p>
                  {r.reply && (
                    <div className="mt-3 bg-blue-50 dark:bg-blue-900 p-3 rounded-lg text-blue-800 dark:text-blue-200 text-sm">
                      💬 Instructor replied: {r.reply}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CourseReviewPage;
