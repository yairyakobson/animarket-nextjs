"use client"

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { UserQueryData } from "../../clientInterfaces/userStateInterfaces/userQueryData";
import type { UserStateData } from "../../clientInterfaces/userStateInterfaces/userStateData";

const initialState: UserStateData = {
  user: null,
  isAuthenticated: false,
  loading: true
}

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserQueryData | null>) =>{
      state.user = action.payload
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) =>{
      state.isAuthenticated = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) =>{
      state.loading = action.payload
    }
  }
});

export const {
  setUser,
  setIsAuthenticated,
  setIsLoading
} = userSlice.actions
export default userSlice.reducer;