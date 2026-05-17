import { NextResponse } from "next/server";

import { BAD_REQUEST, OK } from "@/components/server/constants/httpCodes";

import { fetchAllProducts } from "@/components/server/dataAccess/products";

export async function GET(){
  try{
    const products = await fetchAllProducts();
    return NextResponse.json(
      products,
      { status: OK }
    );
  }
  catch(error){
    console.error("Fetching error:", error);
    return NextResponse.json({
      error: "Failed to fetch products"
    }, { status: BAD_REQUEST });
  }
}