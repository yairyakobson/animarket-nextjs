import { and, asc, desc, eq, or } from "drizzle-orm";

import { db } from "@/drizzle-utils/main-config";
import { NewProduct, products } from "@/drizzle-utils/schemas";
import { ProductFilterInput } from "../schemas/zod/zod-product/ZodProductFilter";

import productQueries from "../useCases/productQueries";

export const createNewProduct = async({ name }: { name: string }, seller: string) =>{
  const [newProductResult] = await db
  .select()
  .from(products)
  .where(
    and(
      eq(products.name, name),
      or(
        eq(products.seller, seller)
      )
    )
  )
  .limit(1);
  
  return newProductResult;
}

export const insertNewProduct = async(query: NewProduct) =>{
  const [insertResult] = await db
  .insert(products)
  .values(query)
  .returning();

  return insertResult;
}

export const duplicatorFinder = async(name: string) =>{
  const [duplicatorFinderResult] = await db
  .select()
  .from(products)
  .where(
    or(
      eq(products.name, name)
    )
  )
  .limit(1);

  return duplicatorFinderResult;
}

export const fetchSingleProduct = async(query: string) =>{
  const [fetchingResult] = await db
  .select()
  .from(products)
  .where(
    eq(products.id, query)
  )
  .limit(1);
  
  return fetchingResult;
}

export const fetchAllProducts = async() =>{
  const entireFetchingResult = await db
  .select()
  .from(products)
  
  return entireFetchingResult;
}

export const fetchUserProducts = async(sellerName: string) =>{
  const userFetchingResult = await db
  .select()
  .from(products)
  .where(
    eq(products.seller, sellerName)
  )
  
  return userFetchingResult;
}

export const filterProducts = async(filters: ProductFilterInput) =>{
  const conditions = productQueries(filters);

  const sortColumn = {
    name: products.name,
    price: products.price,
    rating: products.averageRating,
    reviews: products.totalReviews,
  }[filters.sortBy];

  const orderFn = filters.sortOrder === "desc" ? desc : asc;

  return await db
  .select()
  .from(products)
  .where(conditions.length > 0 ? and(...conditions) : undefined)
  .orderBy(orderFn(sortColumn));
}