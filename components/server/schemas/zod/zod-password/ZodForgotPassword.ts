import { z } from "zod";

import { zodEmailSchema } from "../zod-auth/ZodEmail";

export const ZodForgotPassword = z.object({
  email: zodEmailSchema
});