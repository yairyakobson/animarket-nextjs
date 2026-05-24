import {
  Alert,
  Button,
  Container,
  FloatingLabel,
  Form
} from "react-bootstrap";
import { RxCheckCircled, RxCrossCircled } from "react-icons/rx";

import { ForgotPasswordProps } from "../clientInterfaces/formInterfaces/forgotPasswordInterface";
import { useForgotPasswordMutation } from "../redux/services/userApi";

import errorMessage from "../errors/error";

import forgotPasswordStyles from "../styles/forgotPassword.module.scss";

const ForgotPasswordForm: React.FC<ForgotPasswordProps> = ({
  emailHandler,
  forgotPasswordRef
}) =>{
  const [forgotPassword, { error, isLoading, isSuccess }] = useForgotPasswordMutation();
  console.log(error)
  
  const forgotPasswordHandler = (e: React.SubmitEvent<HTMLFormElement>) =>{
    e.preventDefault();

    const data = {
      email: forgotPasswordRef?.current?.email
    }
    forgotPassword(data).unwrap()
  };

  return(
    <>
      <Container as={"section"} className="formsContainer">
        <h2>Recover your password</h2>

        <Form onSubmit={forgotPasswordHandler}
        className={forgotPasswordStyles.forgotPasswordForm}>
          <section>
            {isSuccess && (
              <Alert variant="success" className="flex">
                <RxCheckCircled size="1.5rem" className="!mr-2"/>A reset email was sent to you
              </Alert>
            )}
            {error && (
              <Alert variant="danger" className="flex">
                <RxCrossCircled size="1.5rem" className="!mr-2"/>{errorMessage(error)}
              </Alert>
            )}
            <FloatingLabel label="Email"
            className={forgotPasswordStyles.formLabel}>
              <Form.Control type="email"
              name="email"
              placeholder="Email Address"
              defaultValue={forgotPasswordRef?.current?.email}
              onChange={emailHandler}
              required/>
            </FloatingLabel>
          </section>
    
          <Button type="submit" variant="danger"
          disabled={isLoading}>Send</Button>
        </Form>
      </Container>
    </>
  );
}

export default ForgotPasswordForm;