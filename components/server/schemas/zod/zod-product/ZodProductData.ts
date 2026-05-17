import z from "zod";
import { zodSellerSchema } from "./ZodSeller";

export const zodProductDataSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string(),
  price:z.coerce.number().positive(),
  category: z.string(),
  condition: z.enum(["New", "Like New", "Refurbished"]),
  stock: z.coerce.number().int().nonnegative(),
  public_id: z.string().optional(),
  url: z.url().optional(),
  signed_url: z.url().optional(),
  totalReviews: z.number().int().default(0),
  averageRating: z.number().default(0)
})
.extend({
  seller: zodSellerSchema
});