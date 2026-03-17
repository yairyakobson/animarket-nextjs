"use client"

import { useRef } from "react";

import ResetPasswordForm from "../forms/resetPasswordForm";

const ResetPassword = () =>{
  const resetPasswordRef = useRef<{
    newPassword: string;
    confirmNewPassword: string;
  }>({
    newPassword: "",
    confirmNewPassword: ""
  });

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const { name, value } = e.target;
    if(name in resetPasswordRef.current){
      resetPasswordRef.current[name as keyof typeof resetPasswordRef.current] = value;
    }
  };

  return(
    <>
      <ResetPasswordForm
      newPasswordHandler={inputHandler}
      confirmNewPasswordHandler={inputHandler}
      resetPasswordRef={resetPasswordRef}/>
    </>
  );
}

export default ResetPassword;