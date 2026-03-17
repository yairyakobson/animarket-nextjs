import { z } from "zod";

export const zodPasswordSchema = z
.string()
.min(6, { message: "Password must be at least 6 characters long" })
.max(255);