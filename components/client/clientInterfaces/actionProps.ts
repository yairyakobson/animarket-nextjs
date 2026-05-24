import { User } from "@/drizzle-utils/schemas";

export interface ActionResponse{
  success: boolean;
  user?: User;
  message?: string;
}