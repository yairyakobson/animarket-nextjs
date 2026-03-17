import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import {
  Alert,
  Button,
  Container,
  FloatingLabel,
  Form
} from "react-bootstrap";
import { toast } from "sonner";

import { useAppSelector } from "../hooks/useAppSelector";
import { ChangePasswordProps } from "../clientInterfaces/pages/changePasswordProps";
import { useUpdatePasswordMutation } from "../redux/services/userApi";

import errorMessage from "../errors/error";

import changePasswordStyles from "../styles/changePassword.module.scss";

const ChangePasswordForm: React.FC<ChangePasswordProps> = ({
  currentPasswordHandler,
  newPasswordHandler,
  passwordRef
}) =>{

  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);
  const [updatePassword, { error, isSuccess, isLoading }] = useUpdatePasswordMutation();

  const formSubmissionRef = useRef(false);

  const changePasswordHandler = (e: React.SubmitEvent<HTMLFormElement>) =>{
    e.preventDefault();
    formSubmissionRef.current = true

    const data = {
      currentPassword: passwordRef?.current?.currentPassword,
      newPassword: passwordRef?.current?.newPassword
    }
    updatePassword(data).unwrap();
  };

  useEffect(() =>{
    if(isSuccess){
      toast.success("You successfully changed your password", {
        duration: 2000
      });
      router.push(`/profile/${user?.name}`)
    }
  }, [isSuccess]);

  return(
    <>
      <Container as={"section"}
      className={changePasswordStyles.changePasswordContainer}>
        <Form onSubmit={changePasswordHandler}
        className={changePasswordStyles.changePasswordForm}>
          <h5>Change Password</h5>
          <section>
            {error && <Alert variant="danger">{errorMessage(error)}</Alert>}
            <FloatingLabel label="Current Password"
            className={changePasswordStyles.formLabel}>
              <Form.Control type="password"
              name="currentPassword"
              placeholder="Current Password"
              onChange={currentPasswordHandler}
              required/>
            </FloatingLabel>
          </section>

          <section>
            <FloatingLabel label="New Password"
            className={changePasswordStyles.formLabel}>
              <Form.Control type="password"
              name="newPassword"
              placeholder="New Password"
              onChange={newPasswordHandler}
              required/>
            </FloatingLabel>
          </section>

          <Button type="submit"
          disabled={isLoading}>Change Password</Button>
        </Form>
      </Container>
    </>
  );
}

export default ChangePasswordForm;