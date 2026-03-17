"use client"

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { userAPI } from "./userApi";
import { store } from "../store";

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1/auth"
  }),
  endpoints: (builder) =>({
    signupUser: builder.mutation({
      query(body){
        return{
          url: "/register",
          method: "POST",
          body
        }
      },
      async onQueryStarted(_, { queryFulfilled }){
        try{
          await queryFulfilled;
        }
        catch(error){
          console.log(error);
        }
      }
    }),
    signinUser: builder.mutation({
      query(body){
        return{
          url: "/login",
          method: "POST",
          body
        }
      },
      async onQueryStarted(_, { queryFulfilled }){
        try{
          await queryFulfilled;
          await store.dispatch(
            userAPI.endpoints.getCurrentUser.initiate()
          )
        }
        catch(error){
          console.log(error);
        }
      }
    }),
    logoutUser: builder.query({
      query: () => "/logout"
    }),
    verifyUser: builder.mutation<void, string>({
      query: (code) =>({
        url: `/verify/${code}`,
        method: "GET"
      })
    })
  })
});

export const {
  useSignupUserMutation,
  useSigninUserMutation,
  useLazyLogoutUserQuery,
  useVerifyUserMutation
} = authAPI;