import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface LoginRequest {
   username: string;
   email:string;
   password: string;
}

interface RegisterRequest {
   name:string;
   username: string;
   email: string;
   password: string;
}

interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    wallet: number;
    transition: {
      id: string;
      amount: number;
      timestamp: string;
    }[];
    __v: number;
  }

export const authApi = createApi({
   reducerPath: 'authApi',
   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
   tagTypes: ['Auth'],
   endpoints: (builder) => ({
       login: builder.mutation<{ user: User }, LoginRequest>({
           query: (body) => ({
               url: '/login',
               method: 'POST', 
               body,
           }),
           invalidatesTags: ['Auth'],
       }),
       register: builder.mutation<void, RegisterRequest>({
           query: (body) => ({
               url: '/register',
               method: 'POST',
               body,
           }),
           invalidatesTags: ['Auth'],
       }),
   }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
