import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { loginType } from '../types';


export const loginAPI = createApi({
    reducerPath: "loginAPI",
    baseQuery: fetchBaseQuery({
        // baseUrl: "https://memoethiopia.onrender.com/api-v1/",
         baseUrl: "http://localhost:8000/api-v1/",
    }),
    endpoints: (builder) => ({
        postlogin: builder.mutation({
            query: ({ loginuser, methodLogin }: { loginuser: loginType; methodLogin: string }) => ({
                url: `${methodLogin}/token/`,
                method: 'POST',
                body: loginuser,
                headers: {
                    'Content-Type': 'application/json',
                }
            }),
        }),
    })
})

export const { usePostloginMutation } = loginAPI