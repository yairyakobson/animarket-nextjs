import { UserQueryData } from "../clientInterfaces/userStateInterfaces/userQueryData";

export type NavbarProps = {
  isAuthenticated?: boolean;
  user?: UserQueryData | null
};