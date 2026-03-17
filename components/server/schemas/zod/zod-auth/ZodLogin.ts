import { z } from "zod";

import { zodEmailSchema } from "./ZodEmail";
import { zodPasswordSchema } from "../zod-password/ZodPassword";

export const zodLoginSchema = z.object({
  email: zodEmailSchema,
  password: zodPasswordSchema
});