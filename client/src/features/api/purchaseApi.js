import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_PURCHASE_API = "http://localhost:8008/api/v1/fake-payment";

export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_PURCHASE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: ({ courseId, paymentMethod, upiId, cardNumber }) => ({
        url: "/checkout/create-checkout-session",
        method: "POST",
        body: { courseId, paymentMethod, upiId, cardNumber }, // Send full payment details
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    confirmPayment: builder.mutation({
      query: (paymentId) => ({
        url: "/webhook",
        method: "POST",
        body: { paymentId },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useCreateCheckoutSessionMutation, useConfirmPaymentMutation } = purchaseApi;
