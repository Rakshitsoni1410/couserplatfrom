import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_PURCHASE_API = "http://localhost:8008/api/v1";

export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_PURCHASE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    // ✅ Store Payment
    storePayment: builder.mutation({
      query: ({ courseId, paymentMethod, upiId, cardNumber }) => {
        if (!courseId) {
          console.error("🚨 Error: courseId is required for payment!");
          return null;
        }

        const body = { courseId, paymentMethod };
        if (paymentMethod === "upi") body.upiId = upiId;
        if (paymentMethod === "card") body.cardNumber = cardNumber;

        return {
          url: "/store-payment", // ✅ Fixed route
          method: "POST",
          body,
          headers: { "Content-Type": "application/json" },
        };
      },
    }),

    // ✅ Get Course Details
    getCourseDetailWithStatus: builder.query({
      query: (courseId) => {
        if (!courseId) {
          console.error("🚨 Error: courseId is missing in API call!");
          return null;
        }
        return { url: `/course/${courseId}`, method: "GET" };
      },
    }),

    // ✅ Get Purchased Courses
    getPurchasedCourses: builder.query({
      query: () => ({ url: `/purchased-courses`, method: "GET" }),
    }),
  }),
});

export const {
  useStorePaymentMutation,
  useGetCourseDetailWithStatusQuery,
  useGetPurchasedCoursesQuery,
} = purchaseApi;
