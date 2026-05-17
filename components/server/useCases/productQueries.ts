import { eq, gte, ilike, lte, SQL } from "drizzle-orm";
import { ProductFilterInput } from "../schemas/zod/zod-product/ZodProductFilter";
import { products } from "@/drizzle-utils/schemas";

export default function productQueries(filters: ProductFilterInput): SQL[]{
  const conditions: SQL[] = [];
  
  if(filters.search){
    conditions.push(ilike(products.name, `%${filters.search}%`));
  }
  if(filters.category){
    conditions.push(eq(products.category, filters.category));
  }
  if(filters.condition){
    conditions.push(eq(products.condition, filters.condition));
  }

  // 2. Numeric Range Filters (Cast explicitly as numeric to avoid string-matching bugs)
  if(filters.minPrice !== undefined){
    conditions.push(lte(products.price, filters.minPrice));
  }
  if(filters.maxPrice !== undefined){
    conditions.push(gte(products.price, filters.maxPrice));
  }

  return conditions
}