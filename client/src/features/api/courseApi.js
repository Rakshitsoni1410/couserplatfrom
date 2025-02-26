import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = "http://localhost:8008/api/v1/course";

export const courseApi = createApi({
    reducerPath: 'courseApi',
    tagTypes: ['Refetch_Creator_Course'],
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
            }),
            invalidatesTags: ['Refetch_Creator_Course']
        }),
        getCreatorCourse: builder.query({
            query: () => ({
                url: "", // Example: If your API provides all courses at this route
                method: "GET",
            }),
            providesTags: ['Refetch_Creator_Course']
        }),
        editCourse: builder.mutation({
            query: ({formData,courseId}) => ({
                url: `/${courseId}`,
                method: "PUT",
                body: formData
            }),
        })
    })
})

// ✅ Export both hooks
export const { useCreateCourseMutation, useGetCreatorCourseQuery, useEditCourseMutation } = courseApi;
