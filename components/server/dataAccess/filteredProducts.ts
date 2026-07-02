import { asc, desc, eq, gte, ilike } from "drizzle-orm";

import { db } from "@/drizzle-utils/main-config";
import { products } from "@/drizzle-utils/schemas";

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

export const fetchLatestProducts = async(date: Date) =>{
  const newProductsResult = await db
  .select()
  .from(products)
  .where(
    gte(products.createdAt, date)
  )
  .orderBy(desc(products.createdAt));
  
  return newProductsResult;
}

export const fetchCategoryList = async() =>{
  const fetchCategoriesResult = await db
  .select({ name: products.category })
  .from(products)
  .groupBy(products.category)
  .orderBy(asc(products.category));
  
  return fetchCategoriesResult.map(row => row.name);
}

export const fetchCategorizedProducts = async(category: string) =>{
  const fetchedCategorizedProducts = await db
  .select()
  .from(products)
  .where(
    eq(products.category, category)
  );
  
  return fetchedCategorizedProducts;
}

export const fetchSearchedProducts = async(query: string) =>{
  const userFetchingResult = await db
  .select()
  .from(products)
  .where(
    ilike(products.name, `%${query}%`)
  )
  .orderBy(asc(products.name));
  
  return userFetchingResult;
}