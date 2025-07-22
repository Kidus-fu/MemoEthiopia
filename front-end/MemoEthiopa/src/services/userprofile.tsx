import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ACCESS_TOKEN } from '../config';


export const userProfileAPI = createApi({
    reducerPath: "singupAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://memoethiopia.onrender.com/api-v1/",
        // baseUrl: "http://127.0.0.1:8000/api-v1/",
        prepareHeaders: (headers: any) => {
            const token = localStorage.getItem(ACCESS_TOKEN)
            
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        }
}),
    endpoints: (builder) => ({
        postuserProfile: builder.mutation({
            query: ({ singupuser }: { singupuser: any; }) => ({
                url: `users/`,
                method: 'POST',
                body: singupuser,
            }),
    }),
    })
})

export const { usePostuserProfileMutation } = userProfileAPI