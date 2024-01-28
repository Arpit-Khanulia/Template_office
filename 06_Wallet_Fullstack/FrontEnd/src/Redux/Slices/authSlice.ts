import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


interface LoginResponseData {
  id: string;
  amount: number;
  timestamp: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
  };
  transition: LoginResponseData[];
}

interface RegisterResponse {
  token: string;
  user: {
    id: number;
    username: string;
  };
}

interface UserData {
    data: {
        id: number;
        email: string;
        first_name: string;
        last_name: string;
        avatar: string;
    };
    support: {
        url: string;
        text: string;
    };
}


export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, { username: string;email:string; password: string }>({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    register: builder.mutation<RegisterResponse, { username: string;email:string; password: string  }>({
      query: (body) => ({
        url: '/register',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    getUser: builder.query<UserData, void>({
      query: () => ({
        url: `/api/users/2`,
        method: 'GET',
      }),

    }),
  }),
});

export const { useLoginMutation, useRegisterMutation,useGetUserQuery } = authApi;
