import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "@/features/authSlice"; // ✅ Ensure correct import

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
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled; // ✅ FIXED: No need for parentheses
                    dispatch(userLoggedIn({ user: result.data.user })); // ✅ Dispatch only if user exists

                } catch (error) {
                    console.error("Login Error:", error);
                }
            },
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: "logout",
                method: "GET",
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    dispatch(userLoggedOut);
                } catch (error) {
                    console.log(error);

                }
            }
        }),
        loadUser: builder.query({
            query: () => ({
                url: "profile",
                method: "GET"
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled; // ✅ FIXED: No need for parentheses
                    dispatch(userLoggedIn({ user: result.data.user })); // ✅ Dispatch only if user exists

                } catch (error) {
                    console.error("Login Error:", error);
                }
            },
        }),
        updateUser: builder.mutation({
            query: (formData) => ({
                url: "profile/update",
                method: "PUT",
                body: formData,
                credentials: "include",
            })
        })
    }),
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useLoadUserQuery,
    useUpdateUserMutation
} = authApi;
