import { z } from "zod";

import { zodPasswordSchema } from "./ZodPassword";
import { zodNewPasswordSchema } from "./ZodNewPassword";

export const ZodChangePassword = z.object({
  currentPassword: zodPasswordSchema,
  newPassword: zodNewPasswordSchema
});