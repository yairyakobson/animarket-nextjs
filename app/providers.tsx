"use client";

import { useRef } from "react";
import { Provider } from "react-redux";

import { store } from "@/components/client/redux/store";
import { UserProviderProps } from "@/components/client/clientInterfaces/userStateInterfaces/userProviderProps";

import {
  setIsAuthenticated,
  setIsLoading,
  setUser
} from "@/components/client/redux/features/userSlice";

export default function Providers({ children, user }: UserProviderProps){
  const initialized = useRef(false);

  if(!initialized.current){
    if(user){
      store.dispatch(setUser(user));
      store.dispatch(setIsAuthenticated(true));
      store.dispatch(setIsLoading(false));
    }
    else{
      store.dispatch(setIsLoading(false));
    }
    initialized.current = true;
  }
  
  return(
    <Provider store={store}>
      {children}
    </Provider>
  );
}