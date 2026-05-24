"use client"

import { configureStore } from "@reduxjs/toolkit";

import { authAPI } from "./services/authApi";
import { userAPI } from "./services/userApi";
import { productAPI } from "./services/productApi";

import userReducer from "../redux/features/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [productAPI.reducerPath]: productAPI.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authAPI.middleware,
      userAPI.middleware,
      productAPI.middleware
    ])
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;