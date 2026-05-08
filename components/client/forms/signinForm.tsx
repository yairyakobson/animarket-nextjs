import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

import {
  Alert,
  Button,
  Container,
  FloatingLabel,
  Form
} from "react-bootstrap";
import { toast } from "sonner";

import { SigninProps } from "../clientInterfaces/signinInterface";
import { useSigninUserMutation } from "../redux/services/authApi";
import { useAppSelector } from "../hooks/useAppSelector";

import errorMessage from "../errors/error";

import signinStyles from "../styles/signin.module.scss";

const SigninForm: React.FC<SigninProps> = ({
  emailHandler,
  passwordHandler,
  signinDataRef
}) =>{

  const { isAuthenticated, user } = useAppSelector((state) => state.user);
  const [signinUser, { error, isLoading }] = useSigninUserMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const formSubmissionRef = useRef(false);

  const signinHandler = async(e: React.SubmitEvent<HTMLFormElement>) =>{
    e.preventDefault();
    formSubmissionRef.current = true

    const data = {
      email: signinDataRef?.current?.email,
      password: signinDataRef?.current?.password
    }
    signinUser(data).unwrap();
  };

  useEffect(() =>{
    if(isAuthenticated){
      if(formSubmissionRef.current){
        toast.success(`Welcome back ${user?.name}`, {
          duration: 2000
        });
        router.push(redirectTo);
        router.refresh();
      }
    }
  }, [isAuthenticated]);

  return(
    <>
      <Container as={"section"} className="formsContainer">
        <h2>Sign In to your account</h2>

        <Form onSubmit={signinHandler} className={signinStyles.signinForm}>
          <section>
            {error && <Alert className="alert-danger">{errorMessage(error)}</Alert>}
            <FloatingLabel label="Email"
            className={signinStyles.formLabel}>
              <Form.Control type="email"
              name="email"
              placeholder="Email Address"
              onChange={emailHandler}
              required/>
            </FloatingLabel>
          </section>

          <section>
            <FloatingLabel label="Password"
            className={signinStyles.formLabel}>
              <Form.Control type="password"
              name="password"
              placeholder="Password"
              onChange={passwordHandler}
              required/>
            </FloatingLabel>
          </section>

          <Button type="submit" variant="danger"
          disabled={isLoading}>Sign In</Button>
        </Form>

        <section className={signinStyles.formSettings}>
          <p>Don't have an account?{" "}
          <Link href="/signup">Create one</Link>
          </p>
          <p>Forgot password?{" "}
          <Link href="/forgot-password">Click here</Link>
          </p>
        </section>
      </Container>
    </>
  );
}

export default SigninForm;