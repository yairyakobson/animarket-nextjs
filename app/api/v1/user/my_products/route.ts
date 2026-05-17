import { NextResponse } from "next/server";

import { BAD_REQUEST, OK } from "@/components/server/constants/httpCodes";

import { fetchUserProducts } from "@/components/server/dataAccess/products";
import { isAuthenticatedUser } from "@/components/server/utils/auth";

export async function GET(){
  try{
    const user = await isAuthenticatedUser();
    const userProducts = await fetchUserProducts(user?.name as string);
    return NextResponse.json(userProducts, { status: OK });
  }
  catch(error){
    console.error("Error fetching user products:", error);
    return NextResponse.json({
      error: "Fetching user products failed"
    }, { status: BAD_REQUEST });
  }
}