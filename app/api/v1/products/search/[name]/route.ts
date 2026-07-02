import { NextRequest, NextResponse } from "next/server";

import { NOT_FOUND, OK } from "@/components/server/constants/httpCodes";

import { fetchSearchedProducts } from "@/components/server/dataAccess/filteredProducts";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ name: string }> }
){
  const { name } = await context.params;

  const products = await fetchSearchedProducts(name);

  if(!products){
    return NextResponse.json({
      error: "No products found" },
      { status: NOT_FOUND }
    );
  };
  return NextResponse.json({
    message: `Number of products: ${products.length}`,
    Products: products
  });
};