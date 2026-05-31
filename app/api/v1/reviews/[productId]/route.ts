import { NextRequest, NextResponse } from "next/server";

import { NOT_FOUND, OK } from "@/components/server/constants/httpCodes";
import { fetchProductReviews } from "@/components/server/dataAccess/reviews";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ productId: string }> }
){
  const { productId } = await context.params;

  const product = await fetchProductReviews(productId);

  if(!product){
    return NextResponse.json({
      error: "Product not found" },
      { status: NOT_FOUND }
    );
  };
  return NextResponse.json({ product }, { status: OK });
};