import { z } from "zod";

import { zodPasswordSchema } from "./ZodPassword";
import { zodNewPasswordSchema } from "./ZodNewPassword";

export const zodResetPasswordSchema = z.object({
  newPassword: zodNewPasswordSchema,
  confirmNewPassword: zodPasswordSchema
})
.refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Passwords do not match",
  path: ["confirmNewPassword"]
});