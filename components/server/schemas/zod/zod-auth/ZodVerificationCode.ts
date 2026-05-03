import { z } from "zod";

export const zodVerificationCodeSchema = z
.string()
.min(1)
.max(56);