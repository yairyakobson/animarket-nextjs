import { NextRequest, NextResponse } from "next/server";

import { NOT_FOUND } from "@/components/server/constants/httpCodes";
import { fetchSingleProduct } from "@/components/server/dataAccess/products";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
){
  const { id } = await context.params;

  const product = await fetchSingleProduct(id);

  if(!product){
    return NextResponse.json({
      error: "Product not found" },
      { status: NOT_FOUND }
    );
  };
  return NextResponse.json({ product })
};