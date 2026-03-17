"use client"

import { configureStore } from "@reduxjs/toolkit";

import { authAPI } from "./services/authApi";
import { userAPI } from "./services/userApi";

import userReducer from "../redux/features/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authAPI.middleware,
      userAPI.middleware
    ])
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;