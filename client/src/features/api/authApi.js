import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {userLoggedIn}from "@/features/authSlice"; // Import the userLoggedIn action creator

const USER_API = "http://localhost:8008/api/v1/user/";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: USER_API,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (inputData) => ({
                url: "register",
                method: "POST",
                body: inputData,
            }),
        }),
        loginUser: builder.mutation({
            query: (inputData) => ({
                url: "login",
                method: "POST",
                body: inputData,
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    // Correct the usage of queryFulfilled
                    const result = await queryFulfilled(); // Correct function call
                    console.log("Login Success:", result.data); // Debugging
                    dispatch(userLoggedIn({ user: result.data.user }));
                } catch (error) {
                    console.error("Login Error:", error);
                }
            },
        }),
    }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
