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
    const rawImage = body.image;

    if(!rawImage){
      return NextResponse.json({
        error: "Product image is required"
      }, { status: BAD_REQUEST });
    }

    const parsed = zodProductDataSchema.safeParse(body);
  
    if(!parsed.success){
      return NextResponse.json({
        error: parsed.error.issues
      }, { status: BAD_REQUEST });
    }

    const {
      name,
      seller,
    } = parsed.data;

    const existing = await createNewProduct({ name }, seller);
    
    if(existing){
      return NextResponse.json({
        error: "You can't create a product with the same name"
      }, { status: CONFLICT });
    };
    
    const newProduct = await insertNewProduct({
      ...parsed.data,
      price: String(parsed.data.price),
      public_id: rawImage.public_id ?? null,
      url: rawImage.url ?? null,
      signed_url: rawImage.signed_url ?? null,
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