import Link from "next/link";

import {
  Alert,
  Button,
  Container,
  FloatingLabel,
  Form
} from "react-bootstrap";
import { RxCheckCircled, RxCrossCircled } from "react-icons/rx";

import { SignupProps } from "../clientInterfaces/formInterfaces/signupProps";
import { useSignupUserMutation } from "../redux/services/authApi";

import errorMessage from "../errors/error";

import signupStyles from "../styles/signup.module.scss";

const SignupForm: React.FC<SignupProps> = ({
  userHandler,
  emailHandler,
  passwordHandler,
  confirmPasswordHandler,
  signupDataRef
}) =>{
  const [signupUser, { error, isLoading, isSuccess }] = useSignupUserMutation();
  console.log(error);

  const clearInputs = () =>{
    if(signupDataRef.current){
      for(const key in signupDataRef.current){
        signupDataRef.current[key as keyof typeof signupDataRef.current] = "";
      }
    }
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => (input.value = ""));
  };
  
  const signupHandler = async(e: React.SubmitEvent<HTMLFormElement>) =>{
    e.preventDefault();

    const data = {
      name: signupDataRef?.current?.user,
      email: signupDataRef?.current?.email,
      password: signupDataRef?.current?.password,
      confirmPassword: signupDataRef?.current?.confirmPassword
    }
    try{
      const response = await signupUser(data).unwrap();
      clearInputs();
      console.log("User registered:", response);
    }
    catch(err: unknown){
      console.error("Signup failed:", err);
    }
  };

  return(
    <>
      <Container as={"section"} className="formsContainer">
        <h2>Create a new account</h2>
        <Form onSubmit={signupHandler}
        className={signupStyles.signupForm}>
          <section>
            {isSuccess && (
              <Alert className="alert-success flex">
                <RxCheckCircled size="1.5rem" className="!mr-2"/>A verification email has been sent
              </Alert>
            )}
            {error && (
              <Alert className="alert-danger flex">
                <RxCrossCircled size="1.5rem" className="!mr-2"/>{errorMessage(error)}
              </Alert>
            )}
            <FloatingLabel label="Username"
              className={signupStyles.formLabel}>
              <Form.Control type="text"
              name="user"
              placeholder="Username"
              defaultValue={signupDataRef?.current?.user}
              onChange={userHandler}
              required/>
            </FloatingLabel>
          </section>

          <section>
            <FloatingLabel label="Email"
            className={signupStyles.formLabel}>
              <Form.Control type="email"
              name="email"
              placeholder="Email Address"
              defaultValue={signupDataRef?.current?.email}
              onChange={emailHandler}
              required/>
            </FloatingLabel>
          </section>
    
          <section>
            <FloatingLabel label="Password"
            className={signupStyles.formLabel}>
              <Form.Control type="password"
              name="password"
              placeholder="Password"
              defaultValue={signupDataRef?.current?.password}
              onChange={passwordHandler}
              required/>
            </FloatingLabel>
          </section>

          <section>
            <FloatingLabel label="Confirm Password"
            className={signupStyles.formLabel}>
              <Form.Control type="password"
              name="password"
              placeholder="Confirm Password"
              defaultValue={signupDataRef?.current?.confirmPassword}
              onChange={(e) => signupDataRef.current.confirmPassword = e.target.value}
              required/>
            </FloatingLabel>
          </section>
    
          <Button type="submit" variant="danger"
          disabled={isLoading}>Sign Up</Button>

          <p>Already have an account?{" "}
          <Link href="/signin">Sign in</Link>
          </p>
        </Form>
      </Container>
    </>
  );
}

export default SignupForm;