export interface UserDocument{
  id: string;
  name: string;
  email: string;
  status: string;
  password: string;
  picture: string;
  role: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  twoFactorEnabled: boolean;
  twoFactorSecret: string;
  resetPasswordToken: String;
  resetPasswordExpire: Date;
  comparePassword(val: string): Promise<boolean>;
  omitPassword: () => Omit<this, "password">;
  getJwtToken: () => string;
}