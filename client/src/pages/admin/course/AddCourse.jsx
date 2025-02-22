import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = "http://localhost:8008/api/v1/course"; // Ensure no trailing slash to prevent duplicate slashes in API requests

export const courseApi = createApi({
    reducerPath: 'courseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: COURSE_API,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: ({ courseTitle, category }) => {
                console.log("Sending Data:", { courseTitle, category }); // Debugging log to verify request payload
                return {
                    url: "/", // Ensure this is correct relative to baseUrl
                    method: "POST",
                    body: { courseTitle, category },
                };
            }
        })
    })
});

export const { useCreateCourseMutation } = courseApi;
