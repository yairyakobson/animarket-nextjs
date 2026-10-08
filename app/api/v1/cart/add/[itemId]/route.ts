import { NextRequest, NextResponse } from "next/server";

import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK
} from "@/components/server/constants/httpCodes";
import { isAuthenticatedUser } from "@/components/server/utils/auth";

import { zodCartItemSchema } from "@/components/server/schemas/zod/zod-cart/ZodCartItem";
import {
  createNewCartItem,
  insertCartItem,
  updateCart,
  updateCartItems
} from "@/components/server/dataAccess/cart";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ itemId: string }> }
){
  try{
    const user = await isAuthenticatedUser();
    const { itemId } = await context.params;
    const decodedProductId = decodeURIComponent(itemId);

    const body = await req.json();
    const parsed = zodCartItemSchema.safeParse(body);
          
    if(!parsed.success){
      return NextResponse.json({
        error: parsed.error.issues
      }, { status: BAD_REQUEST });
    }
    
    const { quantity } = parsed.data;

    const targetProduct = await createNewCartItem(decodedProductId);
    if(!targetProduct){
      return NextResponse.json(
        { error: "Product not found" },
        { status: NOT_FOUND }
      );
    }
    const productPrice = Number(targetProduct.price);

    const updatedCartItem = await updateCartItems(user?.name, targetProduct.name);

    if(updatedCartItem){
      const updatedQuantity = (updatedCartItem.quantity ?? 0) + quantity;
      const updatedTotalPrice = (productPrice * updatedQuantity).toFixed(2);

      await updateCart({
        id: updatedCartItem.id,
        quantity: updatedQuantity,
        totalPrice: updatedTotalPrice
      });

      return NextResponse.json(
        { message: `Updated ${targetProduct.name} quantity` }, 
        { status: OK }
      );
    }
    else{
      const initialTotalPrice = (productPrice * quantity).toFixed(2);
      
      await insertCartItem({
        user: user?.name,
        product: targetProduct.name,
        productId: targetProduct.id,
        price: productPrice.toFixed(2),
        quantity: quantity,
        totalPrice: initialTotalPrice
      });

      return NextResponse.json(
        { message: `Added ${quantity} ${targetProduct.name}(s) to cart` }, 
        { status: OK }
      );
    }
  }
  catch(error){
    console.error("Error:", error);

    return NextResponse.json(
      { error: "Invalid request body" },
      { status: INTERNAL_SERVER_ERROR }
    );
  }
};