import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const USER_API = "http://localhost:8008/api/v1/user/";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "USER_API",
        Credentials: "include",
    }),// Add registerUser endpoint
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (inputData) => ({
                url: "register",
                method: "POST",
                body: inputData,
            })
        }),// Add loginUser endpoint
        loginUser: builder.mutation({
            query: (inputData) => ({
                url: "login",
                method: "POST",
                body: inputData,
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled(arg);
                    dispatch(userLoggedIn({ user: result.data.user }));
                } catch (error) {
                    console.log("Error", error);
                }
            },
        })
    }),
});
export const { useRegisterUserMutation, useLoginUserMutation } = authApi;