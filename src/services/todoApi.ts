import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type TodoData = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export const todoApiService = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
    endpoints: (builder) => ({
        getTodoList: builder.query<TodoData, string>({
            query: (id) => `todos/${id}`,
        }),
        getPostList: builder.query<any, string>({
            query: (id) => `posts/${id}`,
        }),
    }),
});

export const { useGetTodoListQuery, useGetPostListQuery } = todoApiService;