import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ACCESS_TOKEN } from '../../config';

// const endpoint = "http://localhost:8000/memoai/"

const endpoint = "https://memoethiopia.onrender.com/memoai/"

export const createNoteApi = createApi({
    reducerPath: 'createNoteApi',
    baseQuery: fetchBaseQuery({
        baseUrl: endpoint,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem(ACCESS_TOKEN);
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set('Content-Type', 'application/json');
            return headers;
        }
    }),
    endpoints: (builder) => ({
        createAiNote: builder.mutation<any, { user_prompt: string; metadata: any }>({
            query: (body) => ({
                url: 'noteagent/',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useCreateAiNoteMutation } = createNoteApi;
