import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_PURCHASE_API = "http://localhost:8008/api/v1/purchase";

export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_PURCHASE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: ({ courseId, paymentMethod, cardNumber }) => ({
        url: "/checkout/create-checkout-session",
        method: "POST",
        body: { courseId, paymentMethod, cardNumber },
      }),
    }),    
    getCourseDetailWithStatus: builder.query({
      query: (courseId) => ({
        url: `/course/${courseId}/detail-with-status`,
        method: "GET",
      }),
    }),
    getPurchasedCourses: builder.query({
      query: () => ({
        url: `/`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCheckoutSessionMutation,
  useGetCourseDetailWithStatusQuery,
  useGetPurchasedCoursesQuery,
} = purchaseApi;
