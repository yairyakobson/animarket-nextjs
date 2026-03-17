"use client"

import { useRef } from "react";

import SigninForm from "../forms/signinForm";

const Signin = ({ callbackUrl = "/" }) =>{
  const signinRef = useRef<{
    callbackUrl?: string;
    email: string;
    password: string;
  }>({
    callbackUrl,
    email: "",
    password: ""
  });

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const { name, value } = e.target;
    if(name in signinRef.current){
      signinRef.current[name as keyof typeof signinRef.current] = value;
    }
  };

  return(
    <>
      <SigninForm
      emailHandler={inputHandler}
      passwordHandler={inputHandler}
      signinDataRef={signinRef}
      callbackUrl={callbackUrl}/>
    </>
  );
}

export default Signin;