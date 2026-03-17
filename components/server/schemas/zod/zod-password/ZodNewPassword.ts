import { z } from "zod";

export const zodNewPasswordSchema = z
.string()
.min(6, { message: "Password must be at least 6 characters long" })
.max(255);