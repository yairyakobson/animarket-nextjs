import { NextRequest, NextResponse } from "next/server";

import { NOT_FOUND, OK } from "@/components/server/constants/httpCodes";

import { fetchLatestProducts } from "@/components/server/dataAccess/filteredProducts";
import { oneWeekAgo } from "@/components/server/utils/date";

import errorHandler from "@/components/server/middleware/errorHandler";

export async function GET(req: NextRequest){
  try{
    const latestProducts = await fetchLatestProducts(oneWeekAgo());
    
    if(latestProducts.length === 0){
      return NextResponse.json(
        { message: "No new products found within this timeframe." },
        { status: NOT_FOUND }
      );
    }

    return NextResponse.json(latestProducts, { status: OK });
  }
  catch(error: unknown){
    return errorHandler(req, error);
  }
};