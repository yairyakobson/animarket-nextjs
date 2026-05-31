import { z } from "zod";

export const zodFilterProductSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  condition: z.string().optional(),
  price: z.coerce.number().min(1).optional(),
  minPrice: z.coerce.number().int().min(1).optional(),
  maxPrice: z.coerce.number().int().min(1).optional(),
  rating: z.coerce.number().int().min(1).optional(),
  sortBy: z.enum([
    "name",
    "price",
    "rating",
    "reviews"
  ]).default("name"),
  sortOrder: z.enum(["asc", "desc"]).default("asc")
}).strict();

export type ProductFilterInput = z.infer<typeof zodFilterProductSchema>;