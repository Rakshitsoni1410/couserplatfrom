import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const REVIEW_API = "http://localhost:8008/api/v1/review";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: REVIEW_API,
    credentials: "include",
  }),
  tagTypes: ["Refetch_Review"],
  endpoints: (builder) => ({

    // ✅ Create a new review
    addReview: builder.mutation({
      query: (data) => ({
        url: "/", // ✅ Fixed: No "/add"
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Refetch_Review"],
    }),

    // ✅ Get all reviews for a specific course
    getCourseReviews: builder.query({
      query: (courseId) => `/${courseId}`, // ✅ Matches backend: /:courseId
      providesTags: ["Refetch_Review"],
    }),

    // ✅ Instructor reply to a review
    replyToReview: builder.mutation({
      query: ({ reviewId, reply }) => ({
        url: `/reply/${reviewId}`, // ✅ Correct path
        method: "PUT",
        body: { reply },
      }),
      invalidatesTags: ["Refetch_Review"],
    }),

   
  }),
});

export const {
  useAddReviewMutation,
  useGetCourseReviewsQuery,
  useReplyToReviewMutation,
} = reviewApi;
