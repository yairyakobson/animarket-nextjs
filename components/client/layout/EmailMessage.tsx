"use client"

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Alert, Container } from "react-bootstrap";
import { RxCheckCircled, RxCrossCircled } from "react-icons/rx";

import { useVerifyUserMutation } from "../redux/services/authApi";

import emailMessageStyles from "../styles/emailMessage.module.scss";

const EmailMessageLayout = () =>{
  const router = useRouter();
  const { code } = useParams<{ code: string }>();

  const [verifyUser, { isLoading, isSuccess, error }] = useVerifyUserMutation();

  useEffect(() =>{
    if(code){
      verifyUser(code);
    }
  }, [code, verifyUser]);

  useEffect(() =>{
    if(isSuccess){
      const timer = setTimeout(() =>{
        router.replace("/signin");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isSuccess, router]);

  return(
    <>
      <Container as="section" className={emailMessageStyles.messageContainer}>
        {isLoading
        ? (
          <span className="loading loading-spinner loading-lg justify-center"/>
        )
        : (
          <Container as="section" className={emailMessageStyles.alertContainer}>
            {isSuccess && (
              <Alert variant="success">
                <RxCheckCircled size="1.5rem"/>Email Verified!
              </Alert>
            )}
            {error && (
              <Alert variant="danger">
                <RxCrossCircled size="1.5rem"/>The link is either invalid or expired.
              </Alert>
            )}
          </Container>
        )}
      </Container>
    </>
  )
}

export default EmailMessageLayout;