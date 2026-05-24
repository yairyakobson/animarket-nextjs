export interface ResetPasswordProps{
  newPasswordHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  confirmNewPasswordHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetPasswordRef: React.RefObject<{
    newPassword: string;
    confirmNewPassword: string;
  }>
}