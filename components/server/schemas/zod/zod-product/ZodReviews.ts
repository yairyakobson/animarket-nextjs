import { z } from "zod";

export const zodReviewsSchema = z.object({
  productId: z.string().length(12),
  rating: z.number().min(1).max(5),
  comment: z.string()
});