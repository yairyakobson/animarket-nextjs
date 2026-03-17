export interface SigninProps{
  emailHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  passwordHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  callbackUrl?: string;
  signinDataRef: React.RefObject<{
    email: string;
    password: string;
  }>
}