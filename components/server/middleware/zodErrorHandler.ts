import { NextResponse } from "next/server";
import { z } from "zod";

const zodErrorHandler = (error: z.ZodError) =>{
  return NextResponse.json({
    message: z.treeifyError(error)
  });
};

export default zodErrorHandler;