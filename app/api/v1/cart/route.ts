import { NextResponse } from "next/server";

import { BAD_REQUEST, OK } from "@/components/server/constants/httpCodes";

import { isAuthenticatedUser } from "@/components/server/utils/auth";
import { userCart } from "@/components/server/dataAccess/cart";

export async function GET(){
  try{
    const user = await isAuthenticatedUser();

    const userCartItems = await userCart(user?.name);

    return NextResponse.json({
      message: userCartItems.length > 0
      ? `Products in ${user?.name}'s cart: ${userCartItems.length}`
      : "Your cart is empty",
      userCartItems
    }, { status: OK });
  }
  catch(error){
    console.error("Error:", error);

    return NextResponse.json({
      error: "Failed to fetch cart products"
    }, { status: BAD_REQUEST });
  }
}