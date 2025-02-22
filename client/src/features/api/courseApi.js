import { createApi } from "@reduxjs/toolkit/dist/query/react";

const COURSE_API = "http://localhost:8008/api/v1/course"

export const courseApi = createApi({
    reducerPath: 'courseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: COURSE_API,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: (courseTitle, category) => ({
                url: "/",
                method: "POST",
                body: {
                    courseTitle, category
                },
            })
        })
    })
})
export const {useCreateCourseMutation} = courseApi