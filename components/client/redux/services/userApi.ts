"use client"

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  setIsAuthenticated,
  setIsLoading,
  setUser
} from "../features/userSlice";
import { UserQueryData } from '../../clientInterfaces/userStateInterfaces/userQueryData';

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1/user"
  }),
  tagTypes: ["User"],
  endpoints: (builder) =>({
    getCurrentUser: builder.query<UserQueryData, void>({
      query: () => "/me",
      providesTags: ["User"],
      async onQueryStarted(_, { dispatch, queryFulfilled }){
        try{
          const { data } = await queryFulfilled;
          dispatch(setUser(data))
          dispatch(setIsAuthenticated(true));
        }
        catch(error){
          dispatch(setIsLoading(false));
          console.log(error);
        }
        finally{
          dispatch(setIsLoading(false));
        }
      }
    }),
    updatePassword: builder.mutation({
      query(body){
        return{
          url: "/update/password",
          method: "PUT",
          body
        }
      }
    }),
    forgotPassword: builder.mutation({
      query(body){
        return{
          url: "/password/forgot",
          method: "POST",
          body
        }
      }
    }),
    resetPassword: builder.mutation({
      query({ token, body }){
        return{
          url: `/password/reset/${token}`,
          method: "PUT",
          body
        }
      }
    })
  })
});

export const {
  useGetCurrentUserQuery,
  useUpdatePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation
} = userAPI;