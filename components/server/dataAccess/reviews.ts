import { desc, eq, sql } from "drizzle-orm";

import { db } from "@/drizzle-utils/main-config";
import { NewReview, products, reviews } from "@/drizzle-utils/schemas";

export const submitNewProductReview = async(
  newReview: NewReview
) =>{
  const [newReviewResult] = await db
  .insert(reviews)
  .values(newReview)
  .onConflictDoUpdate({
    target: [reviews.productId, reviews.reviewer],
    set: {
      rating: newReview.rating,
      comment: newReview.comment,
      createdAt: new Date()
    }
  })
  .returning();

  if(newReviewResult){
    await db
    .update(products)
    .set({
      totalReviews: sql`(
      SELECT count(*)::int 
      FROM ${reviews} 
      WHERE ${reviews.productId} = ${newReviewResult.productId})`,
      
      averageRating: sql`(
      SELECT coalesce(round(avg(${reviews.rating})::numeric, 1), 0)::float 
      FROM ${reviews} 
      WHERE ${reviews.productId} = ${newReviewResult.productId})`,
      })
    .where(eq(products.id, newReviewResult.productId));
  }

  return newReviewResult;
}

export const fetchProductReviews = async(query: string) =>{
  const reviewFetcherResult = await db
  .select()
  .from(reviews)
  .where(
    eq(reviews.productId, query)
  )
  
  return reviewFetcherResult;
}

export const productReviews = async(query: string) =>{
  const productreviewsTable = await db
  .select()
  .from(reviews)
  .where(eq(reviews.productId, query))
  .orderBy(desc(reviews.createdAt));
  
  return productreviewsTable;
}

export const sellerReviewSubmissionBlocker = async(productId: string) =>{
  const [productSellerFinder] = await db
  .select({ seller: products.seller })
  .from(products)
  .where(eq(products.id, productId));

  return productSellerFinder;
}