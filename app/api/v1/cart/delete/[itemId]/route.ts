import { NextRequest, NextResponse } from "next/server";

import {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK
} from "@/components/server/constants/httpCodes";

import { isAuthenticatedUser } from "@/components/server/utils/auth";
import { deleteCartItem } from "@/components/server/dataAccess/cart";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ itemId: string }> }
){
  try{
    const user = await isAuthenticatedUser();

    const { itemId } = await context.params;
    const decodedProductId = decodeURIComponent(itemId);

    const targetProduct = await deleteCartItem(user.name, decodedProductId);
    if(!targetProduct){
      return NextResponse.json(
        { error: "Item not found in your cart" },
        { status: NOT_FOUND }
      );
    }
    return NextResponse.json(
      { message: `Deleted ${targetProduct.product}` }, 
      { status: OK }
    );
  }
  catch(error){
    console.error("Error:", error);

    return NextResponse.json(
      { error: "Invalid request body" },
      { status: INTERNAL_SERVER_ERROR }
    );
  }
};