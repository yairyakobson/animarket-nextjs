export interface ChangePasswordProps{
  currentPasswordHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  newPasswordHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  passwordRef: React.RefObject<{
    currentPassword: string;
    newPassword: string;
  }>
}