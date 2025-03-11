import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_PURCHASE_API = "http://localhost:8008/api/v1"; // ✅ Correct base URL

export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_PURCHASE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createPaymentSession: builder.mutation({
      query: ({ courseId, paymentMethod, upiId, cardNumber }) => {
        if (!courseId) throw new Error("🚨 Error: courseId is required for payment!");

        const body = { courseId, paymentMethod };
        if (paymentMethod === "upi") body.upiId = upiId;
        if (paymentMethod === "card") body.cardNumber = cardNumber;

        return {
          url: "/checkout/create-payment-session", // ✅ Corrected path
          method: "POST",
          body,
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    getCourseDetailWithStatus: builder.query({
      query: (courseId) => {
        if (!courseId) {
          console.error("🚨 Error: courseId is missing in API call!");
          return { url: "" }; // Prevents invalid requests
        }
        return {
          url: `/course/${courseId}`, // ✅ Correct URL
          method: "GET",
        };
      },
    }),
    getPurchasedCourses: builder.query({
      query: () => ({
        url: `/all`, // ✅ Corrected path
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreatePaymentSessionMutation,
  useGetCourseDetailWithStatusQuery,
  useGetPurchasedCoursesQuery,
} = purchaseApi;
