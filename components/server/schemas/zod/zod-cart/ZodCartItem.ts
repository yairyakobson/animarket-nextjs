import { z } from "zod";

export const zodCartItemSchema = z.object({
  quantity: z.coerce.number().int().min(1, "Quantity must be at least 1")
});