import { z } from "zod";

export const zodFilterProductSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  condition: z.string().optional(),
  price: z.coerce.number().min(0).optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  sortBy: z.enum([
    "price",
    "name",
    "rating",
    "reviews"
  ]).default("name"),
  sortOrder: z.enum(["asc", "desc"]).default("asc"),
}).strict();

// Create a TypeScript type based on the schema
export type ProductFilterInput = z.infer<typeof zodFilterProductSchema>;