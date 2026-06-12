import { NextResponse } from "next/server";

import { BAD_REQUEST, NOT_FOUND, OK } from "@/components/server/constants/httpCodes";

import { fetchAllProducts } from "@/components/server/dataAccess/products";

export async function GET(){
  try{
    const productsList = await fetchAllProducts();
    if(productsList.length > 0){
      return NextResponse.json(
      productsList,
      { status: OK });
    }
    return NextResponse.json({
      error: `Number of products: ${productsList.length}` },
      { status: NOT_FOUND }
    );
    
  }
  catch(error){
    console.error("Fetching error:", error);
    
    return NextResponse.json({
      error: "Failed to fetch products"
    }, { status: BAD_REQUEST });
  }
}