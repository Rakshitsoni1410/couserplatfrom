import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = "http://localhost:8008/api/v1/course";

export const courseApi = createApi({
    reducerPath: 'courseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: COURSE_API,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: ({ courseTitle, category, coursePrice = 0 }) => ({
                url: "/",
                method: "POST",
                body: { courseTitle, category, coursePrice },
            })
        }),
        getCreatorCourses: builder.query({
            query: () => ({
                url: "/",
                method: "GET",
            })
        })
    })
})

// ✅ Export both hooks
export const { useCreateCourseMutation, useGetCreatorCoursesQuery } = courseApi;
