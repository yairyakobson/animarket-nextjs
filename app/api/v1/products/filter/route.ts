import { NextRequest, NextResponse } from "next/server";

import { BAD_REQUEST, NOT_FOUND, OK } from "@/components/server/constants/httpCodes";
import { filterProducts } from "@/components/server/dataAccess/products";
import { zodFilterProductSchema } from "@/components/server/schemas/zod/zod-product/ZodProductFilter";

import errorHandler from "@/components/server/middleware/errorHandler";

export async function GET(req: NextRequest){
  try{
    const { searchParams } = new URL(req.url);
    const queryObj = Object.fromEntries(searchParams.entries());

    const parsed = zodFilterProductSchema.safeParse(queryObj);
      
    if(!parsed.success){
      return NextResponse.json({
        error: parsed.error.issues
      }, { status: BAD_REQUEST });
    }

    const filteredProducts = await filterProducts(parsed.data);

    if(filteredProducts.length > 0){
      return NextResponse.json(
        { message: `Number of products: ${filteredProducts.length}`,
          filteredProducts
        }, 
        { status: OK }
      );
    }
    return NextResponse.json(
      { message: "No products found" }, 
      { status: NOT_FOUND }
    );
  }
  catch(error){
    return errorHandler(req, error);
  }
}