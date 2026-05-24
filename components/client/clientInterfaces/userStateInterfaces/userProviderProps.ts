import { UserQueryData } from "./userQueryData";

export interface UserProviderProps{
  children: React.ReactNode;
  user?: UserQueryData | null;
}