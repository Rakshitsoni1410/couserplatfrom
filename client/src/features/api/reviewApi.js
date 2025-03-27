import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const REVIEW_API = "http://localhost:8008/api/v1/review";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: REVIEW_API,
    credentials: "include",
  }),
  tagTypes: ["Refetch_Review"], // Optional for refetching
  endpoints: (builder) => ({
    // Create a new review
    addReview: builder.mutation({
      query: (data) => ({
        url: "/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Refetch_Review"],
    }),

    // Get all reviews for a specific instructor
    getInstructorReviews: builder.query({
      query: (instructorId) => `/instructor/${instructorId}`,
      providesTags: ["Refetch_Review"],
    }),

    // Instructor reply to a review
    replyToReview: builder.mutation({
      query: ({ reviewId, reply }) => ({
        url: `/reply/${reviewId}`,
        method: "PUT",
        body: { reply },
      }),
      invalidatesTags: ["Refetch_Review"],
    }),

    // Get reviews for a specific course
    getCourseReviews: builder.query({
      query: (courseId) => `/course/${courseId}`,
      providesTags: ["Refetch_Review"],
    }),
  }),
});

export const {
  useAddReviewMutation,
  useGetInstructorReviewsQuery,
  useReplyToReviewMutation,
  useGetCourseReviewsQuery,
} = reviewApi;
