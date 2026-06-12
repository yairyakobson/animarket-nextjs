import { desc, eq, gte } from "drizzle-orm";

import { db } from "@/drizzle-utils/main-config";
import { products } from "@/drizzle-utils/schemas";

export const fetchNewProducts = async(date: Date) =>{
  const newProductsResult = await db
  .select()
  .from(products)
  .where(
    gte(products.createdAt, date)
  )
  .orderBy(desc(products.createdAt));
  
  return newProductsResult;
}

export const fetchTopRatedProducts = async(minRating: number) =>{
  const topRatedProductsResult = await db
  .select()
  .from(products)
  .where(
    gte(products.averageRating, minRating)
  )
  .orderBy(desc(products.averageRating));
  
  return topRatedProductsResult;
}

export const fetchCategorizedProducts = async(category: string) =>{
  const categorizedProducts = await db
  .select()
  .from(products)
  .where(
    eq(products.category, category)
  );
  
  return categorizedProducts;
}