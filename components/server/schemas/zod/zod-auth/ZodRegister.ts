import { zodLoginSchema } from "./ZodLogin";
import { zodPasswordSchema } from "../zod-password/ZodPassword";
import { zodUserSchema } from "../zod-user/ZodUser";

export const zodRegisterSchema = zodLoginSchema
.extend({
  name: zodUserSchema,
  confirmPassword: zodPasswordSchema
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});