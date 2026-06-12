import { NextRequest, NextResponse } from "next/server";

import { NOT_FOUND, OK } from "@/components/server/constants/httpCodes";

import { fetchTopRatedProducts } from "@/components/server/dataAccess/filteredProducts";

import errorHandler from "@/components/server/middleware/errorHandler";

export async function GET(req: NextRequest){
  try{
    const topRating = 4.5;

    const topRatedProducts = await fetchTopRatedProducts(topRating);

    // Properly checking for an empty array
    if(topRatedProducts.length === 0){
      return NextResponse.json({
        message: `No products found with a rating of ${topRating} or higher.`
      }, { status: NOT_FOUND });
    }

    return NextResponse.json({
      message: `Number of products: ${topRatedProducts.length}`,
      topRatedProducts
    }, { status: OK });

  }
  catch(error: unknown) {
    return errorHandler(req, error);
  }
};