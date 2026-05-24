export interface ForgotPasswordProps{
  emailHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  forgotPasswordRef: React.RefObject<{
    email: string;
  }>
}