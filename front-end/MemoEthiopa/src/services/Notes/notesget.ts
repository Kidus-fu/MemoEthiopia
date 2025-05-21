import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ACCESS_TOKEN } from '../../config'
import { noteType } from '../types';

export const notesgetAPI = createApi({
    reducerPath: "notesgetAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://memoethiopia.onrender.com/api-v1/",
        prepareHeaders: (headers: any) => {
            const token = localStorage.getItem(ACCESS_TOKEN)
            console.log(token);
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),

    endpoints: (builder) => ({
        getnotes: builder.query({
            query: () => 'notes/'
        }),
        postnote: builder.mutation({
            query: (newNote: noteType) => ({
                url: 'notes/', // API endpoint for posting a new note
                method: 'POST', // Use POST method
                body: newNote, // Pass the note data as the body
            }),
        }),

        // Update an existing note (PUT)
        updatenote: builder.mutation({
            query: ({ uuid, updatedNote }) => ({
                url: `notes/${uuid}/`,  // Specify the note ID in the URL
                method: 'PUT',
                body: updatedNote,  // Pass the updated note data
            }),
        }),

        // Delete an existing note (DELETE)
        deletenote: builder.mutation({
            query: (uuid) => ({
                url: `notes/${uuid}/`,  // Specify the note ID in the URL
                method: 'DELETE',
            }),
        }),
        // Update an existing note (PATCH)
        updatenoteP: builder.mutation({
            query: ({ uuid, updatedFields }) => ({
                url: `notes/${uuid}/`,  // Target specific note
                method: 'PATCH',        // Use PATCH instead of PUT
                body: updatedFields,    // Only send changed fields
            }),
        }),

    })
})

export const {
     useGetnotesQuery,
      usePostnoteMutation,
      useUpdatenoteMutation,
      useUpdatenotePMutation,
      useDeletenoteMutation
     } = notesgetAPI

/*
using code 
const {data, isError, isLoading} = useGetnotesQuery({}) 

use code update patch
const [updateNote, { isLoading }] = useUpdatenoteMutation();
await updateNote({ uuid: noteId, updatedFields: { content: "New text" } });

*/