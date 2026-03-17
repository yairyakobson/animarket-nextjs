"use client"

import { useRef } from "react";

import ChangePasswordForm from "../../forms/changePasswordForm";

const ChangePassword = () =>{
  const changePasswordRef = useRef<{
    currentPassword: string;
    newPassword: string;
  }>({
    currentPassword: "",
    newPassword: ""
  });

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const { name, value } = e.target;
    if(name in changePasswordRef.current){
      changePasswordRef.current[name as keyof typeof changePasswordRef.current] = value;
    }
  };

  return(
    <>
      <ChangePasswordForm
      currentPasswordHandler={inputHandler}
      newPasswordHandler={inputHandler}
      passwordRef={changePasswordRef}/>
    </>
  );
}

export default ChangePassword;