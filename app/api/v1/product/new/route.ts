import { NextRequest, NextResponse } from "next/server";
import { BAD_REQUEST, CONFLICT, CREATED, UNAUTHORIZED } from "@/components/server/constants/httpCodes";

import { zodProductDataSchema } from "@/components/server/schemas/zod/zod-product/ZodProductData";

import { createNewProduct, insertNewProduct } from "@/components/server/dataAccess/products";
import { getServerUser } from "@/components/server/utils/cookies/clientCookie";

import errorHandler from "@/components/server/middleware/errorHandler";

export async function POST(req: NextRequest){
  try{
    const user = await getServerUser();
    if(!user?.name){
      return NextResponse.json({
        error: "Unauthorized"
      }, { status: UNAUTHORIZED });
    }

    const body = await req.json();
    const parsed = zodProductDataSchema.safeParse(body);
  
    if(!parsed.success){
      return NextResponse.json({
        error: parsed.error.issues
      }, { status: BAD_REQUEST });
    }

    const {
      name,
      seller
    } = parsed.data;

    const existing = await createNewProduct(name, seller as string);
    
    if(existing){
      return NextResponse.json({
        error: "Product already exists" },
      { status: CONFLICT });
    }
    
    const newProduct = await insertNewProduct({
      ...parsed.data,
      seller: user?.name as string
    });

    return NextResponse.json({
      message: `${newProduct?.name} has been successfully added`,
      id: newProduct?.id
    }, { status: CREATED });
  }
  catch(error: unknown){
    return errorHandler(req, error);
  }
}