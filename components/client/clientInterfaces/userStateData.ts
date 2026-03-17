import { UserQueryData } from "./userQueryInterface";

export interface UserStateData{
  user: UserQueryData | null;
  isAuthenticated: boolean;
  loading: boolean;
}