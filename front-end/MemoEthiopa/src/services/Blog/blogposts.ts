import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



export interface Category {
    id: number;
    title: string;
    slug: string;
}

export interface Comment {
    id: number;
    text: string;
    created_at: string;
    post: number;  // post id
}
export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    description: string;
    photo?: string;
    created_at: string;
    updated_at: string;
    comments:Comment[];
    categories: Category[];
}

interface APIRESPONSEBlogPost {
    count: number;
    next: string | null;
    previous: string | null;
    results: BlogPost[];
}
interface APIRESPONSECategory {
    count: number;
    next: string | null;
    previous: string | null;
    results: Category[];
}

// const endpoint = "http://localhost:8000/blog/"

const endpoint = "https://memoethiopia.onrender.com/blog/"

const baseQuery = fetchBaseQuery({
    baseUrl: endpoint,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set('Authorization', `Token ${token}`); 
        }
        return headers;
    },
});


export const blogApi = createApi({
    reducerPath: 'blogApi',
    baseQuery,
    tagTypes: ['BlogPost', 'Category', 'Comment'],
    endpoints: (builder) => ({
        getBlogPosts: builder.query<APIRESPONSEBlogPost, void>({
            query: () => 'posts/',
            providesTags: ['BlogPost'],
        }),
        getBlogPostbycategory: builder.query<APIRESPONSEBlogPost, string>({
            query: (category) => `posts/?category_title=${category}`,
            providesTags: ['BlogPost'],
        }),
        getBlogPost: builder.query<BlogPost, string>({
            query: (slug) => `posts/${slug}/`,
            providesTags: (_ , __ , slug) => [{ type: 'BlogPost', slug }],
        }),
        getCategories: builder.query<APIRESPONSECategory, void>({
            query: () => 'categories/',
            providesTags: ['Category'],
        }),
        getCategory: builder.query<Category, number>({
            query: (id) => `categories/${id}/`,
            providesTags: (_, __, id) => [{ type: 'Category', id }],
        }),
        getComments: builder.query<Comment[], void>({
            query: () => 'comments/',
            providesTags: ['Comment'],
        }),
        addComment: builder.mutation<Comment, Partial<Comment>>({
            query: (comment) => ({
                url: 'comments/',
                method: 'POST',
                body: comment,
            }),
            invalidatesTags: ['Comment'],
        }),
    }),
});

export const {
    useGetBlogPostsQuery,
    useGetBlogPostQuery,
    useGetBlogPostbycategoryQuery,
    useGetCategoriesQuery,
    useGetCategoryQuery,
    useGetCommentsQuery,
    useAddCommentMutation,
} = blogApi;
