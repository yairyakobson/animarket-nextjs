import { NextRequest, NextResponse } from "next/server";

import { BAD_REQUEST, CREATED, FORBIDDEN } from "@/components/server/constants/httpCodes";

import { zodReviewsSchema } from "@/components/server/schemas/zod/zod-product/ZodReviews";
import { sellerReviewSubmissionBlocker, submitNewProductReview } from "@/components/server/dataAccess/reviews";

import errorHandler from "@/components/server/middleware/errorHandler";
import { isAuthenticatedUser } from "@/components/server/utils/auth";

export async function POST(req: NextRequest){
  try{
    const body = await req.json();
    const parsed = zodReviewsSchema.safeParse(body);
    const user = await isAuthenticatedUser();
  
    if(!parsed.success){
      return NextResponse.json({
        error: parsed.error.issues
      }, { status: BAD_REQUEST });
    }

    const { productId } = parsed.data;

    const sellerReviewBlocker = await sellerReviewSubmissionBlocker(productId);
    
    if(sellerReviewBlocker?.seller === user?.name){
      return NextResponse.json(
        { error: "Sellers cannot review their own products." }, 
        { status: FORBIDDEN }
      );
    }
    
    const reviewData = {
      ...parsed.data,
      reviewer: (parsed.data as { reviewer?: string }).reviewer ?? user?.name
    };

    const newProductReview = await submitNewProductReview(reviewData);

    return NextResponse.json({
      message: "Review submitted",
      review: newProductReview
    }, { status: CREATED });
  }
  catch(error){
    return errorHandler(req, error);
  }
}