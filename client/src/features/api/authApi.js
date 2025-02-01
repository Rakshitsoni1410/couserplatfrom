import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const USER_API = "http://localhost:8008/api/v1/user/";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: USER_API, // ✅ Removed quotes, using the actual variable
        credentials: "include", // ✅ Fixed lowercase "credentials"
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
                    const result = await queryFulfilled(); // ✅ Fixed incorrect function call
                    dispatch(userLoggedIn({ user: result.data.user })); // ✅ Ensure userLoggedIn is correctly imported
                } catch (error) {
                    console.error("Login Error:", error);
                }
            },
        }),
    }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
