import z from "zod";

import { zodSellerSchema } from "./ZodSeller";
import { zodProductImageSchema } from "./ZodProductImage";

export const zodProductDataSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string(),
  price: z.coerce.number().positive(),
  stock: z.coerce.number().nonnegative(),
  category: z.string(),
  condition: z.string(),
  totalReviews: z.string().default("0"),
  averageRating: z.string().default("0")
})
.extend({
  seller: zodSellerSchema,
  image: zodProductImageSchema
});