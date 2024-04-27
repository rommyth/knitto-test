'use client';
// Need to use the React-specific entry point to import createApi

import type { Action, PayloadAction } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ITodos } from '@/app/page';

// Define a service using a base URL and expected endpoints
export const todosApi = createApi({
    reducerPath: 'todosApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/todos' }),

    tagTypes: ['todos'],
    endpoints: (builder) => ({
        getTodos: builder.query<ITodos[], any>({
            query: (payload) => {
                return {
                    url: '/?' + payload,
                    method: 'GET',
                };
            },

            providesTags: ['todos'],
        }),
        addTodos: builder.mutation<ITodos, any>({
            query: (payload) => ({
                url: '/',
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ['todos'],
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTodosQuery, useAddTodosMutation } = todosApi;
