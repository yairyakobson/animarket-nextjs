export interface SignupProps{
  userHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  emailHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  passwordHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  confirmPasswordHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  signupDataRef: React.RefObject<{
    user: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>
}