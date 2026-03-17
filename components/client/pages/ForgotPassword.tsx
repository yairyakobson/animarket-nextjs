"use client"

import { useRef } from "react";

import ForgotPasswordForm from "../forms/forgotPasswordForm";

const ForgotPassword = () =>{
  const forgotPasswordRef = useRef<{ email: string; }>({
    email: ""
  });

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const { name, value } = e.target;
    if(name in forgotPasswordRef.current){
      forgotPasswordRef.current[name as keyof typeof forgotPasswordRef.current] = value;
    }
  };

  return(
    <>
      <ForgotPasswordForm
      emailHandler={inputHandler}
      forgotPasswordRef={forgotPasswordRef}/>
    </>
  );
}

export default ForgotPassword;