import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usersgetAPI = createApi({
    reducerPath: "usersgetAPI",
    baseQuery : fetchBaseQuery({baseUrl : "https://memoethiopia.onrender.com/api-v1/"}),
    endpoints: (builder) => ({
        getusers: builder.query({
            query: () => 'users/'
        })
    })
})

export const { useGetusersQuery } = usersgetAPI

/*
using code 
const {data, isError, isLoading} = useGetusersQuery({}) 
*/