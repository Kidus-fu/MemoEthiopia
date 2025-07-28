import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { signupType } from '../types';


export const signupAPI = createApi({
    reducerPath: "signupAPI",
    baseQuery: fetchBaseQuery({
        // baseUrl: "https://memoethiopia.onrender.com/api-v1/",
        baseUrl: "http://localhost:8000/api-v1/",
    }),
    tagTypes: [""], 
    endpoints: (builder) => ({
        postsignup: builder.mutation({
            query: ({ signupuser }: { signupuser: signupType }) => ({
                url: `register/`,
                method: 'POST',
                body: signupuser,
                headers: {
                    'Content-Type': 'application/json',
                }
            }),

        }),
    }),
})

export const { usePostsignupMutation } = signupAPI ;