"use client"

import { useRef } from "react";

import SignupForm from "../forms/signupForm";

const Signup = () =>{
  const signupRef = useRef<{
    user: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    user: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const { name, value } = e.target;
    if(name in signupRef.current){
      signupRef.current[name as keyof typeof signupRef.current] = value;
    }
  };

  return(
    <>
      <SignupForm
      userHandler={inputHandler}
      emailHandler={inputHandler}
      passwordHandler={inputHandler}
      confirmPasswordHandler={inputHandler}
      signupDataRef={signupRef}/>
    </>
  );
}

export default Signup;