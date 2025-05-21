import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { singupType } from '../types';


export const singupAPI = createApi({
    reducerPath: "singupAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api-v1/",
    }),
    tagTypes: ["User"], 
    endpoints: (builder) => ({
        postsingup: builder.mutation({
            query: ({ singupuser }: { singupuser: singupType }) => ({
                url: `register/`,
                method: 'POST',
                body: singupuser,
                headers: {
                    'Content-Type': 'application/json',
                }
            }),

        }),
    }),
})

export const { usePostsingupMutation } = singupAPI ;