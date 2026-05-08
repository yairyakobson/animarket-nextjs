import { redirect, useParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import {
  Alert,
  Button,
  Container,
  FloatingLabel,
  Form
} from "react-bootstrap";
import { RxCrossCircled } from "react-icons/rx";
import { toast } from "sonner";

import { ResetPasswordProps } from "../clientInterfaces/resetPasswordInterface";
import { useResetPasswordMutation } from "../redux/services/userApi";

import errorMessage from "../errors/error";

import resetPasswordStyles from "../styles/resetPassword.module.scss";

const ResetPasswordForm: React.FC<ResetPasswordProps> = ({
  newPasswordHandler,
  confirmNewPasswordHandler,
  resetPasswordRef
}) =>{

  const router = useRouter();
  const params = useParams();
  const token = params.token as string

  const [resetPassword, { error, isLoading, isSuccess }] = useResetPasswordMutation();

  const formSubmissionRef = useRef(false);

  const resetPasswordHandler = (e: React.SubmitEvent<HTMLFormElement>) =>{
    e.preventDefault();
    formSubmissionRef.current = true

    const data = {
      token,
      body: {
        newPassword: resetPasswordRef?.current?.newPassword,
        confirmNewPassword: resetPasswordRef?.current?.confirmNewPassword
      }
    };
    resetPassword(data).unwrap();
  };

  useEffect(() =>{
    if(isSuccess && formSubmissionRef.current){
      toast.success("Your password was successfully changed", {
        duration: 2000
      });
      formSubmissionRef.current = false; // prevent repeat
      redirect("/signin");
    }
  }, [isSuccess, router]);

  return(
    <>
      <Container as={"section"} className="formsContainer">
        <h2>Create a new password</h2>

        <Form onSubmit={resetPasswordHandler}
        className={resetPasswordStyles.resetPasswordForm}>
          <section>
            {error && (
              <Alert variant="danger" className="flex">
                <RxCrossCircled size="1.5rem" className="!mr-2"/>{errorMessage(error)}
              </Alert>
            )}
            <FloatingLabel label="New Password"
            className={resetPasswordStyles.formLabel}>
              <Form.Control type="password"
              name="newPassword"
              placeholder="New Password"
              onChange={newPasswordHandler}
              required/>
            </FloatingLabel>
          </section>

          <section>
            <FloatingLabel label="Confirm new password"
            className={resetPasswordStyles.formLabel}>
              <Form.Control type="password"
              name="confirmNewPassword"
              placeholder="Confirm New Password"
              onChange={confirmNewPasswordHandler}
              required/>
            </FloatingLabel>
          </section>

          <Button type="submit" variant="danger"
          disabled={isLoading}>Reset Password</Button>
        </Form>
      </Container>
    </>
  );
}

export default ResetPasswordForm;