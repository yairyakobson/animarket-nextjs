import { NextRequest, NextResponse } from "next/server";

import { NOT_FOUND } from "@/components/server/constants/httpCodes";

import { fetchCategorizedProducts } from "@/components/server/dataAccess/filteredProducts";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ category: string }> }
){
  const { category } = await context.params;

  const categorizedProducts = await fetchCategorizedProducts(category);

  if(categorizedProducts.length === 0){
    return NextResponse.json({
      error: "There are no products in this category yet" },
      { status: NOT_FOUND }
    );
  };
  return NextResponse.json({
    message: `Number of products: ${categorizedProducts.length}`,
    Products: categorizedProducts
  });
};