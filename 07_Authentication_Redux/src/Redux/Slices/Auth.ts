import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../Store';


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
  interface Transaction {
      id: string;
      amount: number;
      timestamp: string;
    }
    export const authApi = createApi({
        
        reducerPath: 'authApi',
        baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000',
        prepareHeaders:(headers,{getState})=>{
            const authToken=(getState() as RootState).saveUserAndToken.accessToken;
            if(authToken){
                headers.set("authorization",`Bearer ${authToken}`);
            }
            return headers;
        }

                
 }),
   tagTypes: ['Auth'],
   endpoints: (builder) => ({

       login: builder.mutation<{ user: User ,accessToken:string}, LoginRequest>({
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

       getLastMonthData: builder.query<Transaction[], void>({
           query: () => ({
               url: '/lastmonth',
               method: 'GET',
           }),
           providesTags: ['Auth'],
       }),




   }),
});

export const { useLoginMutation, useRegisterMutation,useGetLastMonthDataQuery } = authApi;





