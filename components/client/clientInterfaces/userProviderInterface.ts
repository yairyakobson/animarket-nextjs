import { UserQueryData } from "./userQueryInterface";

export interface UserProviderProps{
  children: React.ReactNode;
  user?: UserQueryData | null;
}