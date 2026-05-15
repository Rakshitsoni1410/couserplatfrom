import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const REVIEW_API = `${import.meta.env.VITE_API_URL}/review`;
export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: REVIEW_API,
    credentials: "include",
  }),
  tagTypes: ["Refetch_Review", "Review"],
  endpoints: (builder) => ({
    // ✅ Create a new review
    addReview: builder.mutation({
      query: (data) => ({
        url: "/", // POST /api/v1/review/
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Refetch_Review"],
    }),

    // ✅ Get all reviews for a specific course
    getCourseReviews: builder.query({
      query: (courseId) => `/${courseId}`,
      providesTags: ["Refetch_Review"],
    }),

    // ✅ Instructor reply to a student review
    replyToReview: builder.mutation({
      query: ({ reviewId, reply }) => ({
        url: `/reply/${reviewId}`,
        method: "PUT",
        body: { reply },
      }),
      invalidatesTags: ["Refetch_Review"],
    }),

    // ✅ Instructor fetches reviews for their course(s)
    // ✅ Instructor fetches reviews for their courses
    getInstructorReviews: builder.query({
      query: ({ courseId }) => {
        let queryStr = "/instructor-reviews";
        if (courseId) queryStr += `?courseId=${courseId}`;

        return { url: queryStr, method: "GET" };
      },
      providesTags: ["Refetch_Review"],
    }),

    // ✏️ Edit review
    /*editReview: builder.mutation({
      query: ({ reviewId, rating, comment }) => ({
        url: `/${reviewId}`,
        method: "PUT",
        body: { rating, comment },
      }),
      invalidatesTags: ["Refetch_Review"],
    }),

    // 🗑️ Delete review
    deleteReview: builder.mutation({
      query: (reviewId) => ({
        url: `/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Refetch_Review"],
    }),*/
  }),
});

export const {
  useAddReviewMutation,
  useGetCourseReviewsQuery,
  useReplyToReviewMutation,
  useGetInstructorReviewsQuery,
  // useEditReviewMutation,
  // useDeleteReviewMutation,
} = reviewApi;
