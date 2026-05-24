import { UserQueryData } from "./userQueryData";

export interface UserStateData{
  user: UserQueryData | null;
  isAuthenticated: boolean;
  loading: boolean;
}