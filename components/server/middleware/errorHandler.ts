import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { NODE_ENV } from "../constants/env-keys";
import { INTERNAL_SERVER_ERROR } from "../constants/httpCodes";

import { knownErrorHandlers } from "./errors";

import zodErrorHandler from "./zodErrorHandler";
import AppError from "../utils/appError";

const errorHandler = (req: NextRequest, err: unknown): NextResponse =>{
  console.error(`Error on path: ${req.nextUrl.pathname}`, err);

  let error = {
    statusCode: INTERNAL_SERVER_ERROR,
    message: "Internal Server Error"
  };

  // Zod error
  if(error instanceof ZodError){
    return zodErrorHandler(error)
  }

  // Custom error
  if(err instanceof AppError){
    error = {
      statusCode: err.statusCode,
      message: err.message
    };
  }

  for(const handler of knownErrorHandlers){
    const knownError = handler(err);
    if(knownError){
      error = knownError;
      break;
    }
  }

  // Now send different responses based on environment
  if(NODE_ENV === "development"){
    return NextResponse.json({
      message: error.message,
      error: err,
      stack: (err instanceof Error && err.stack) || undefined
    }, { status: error.statusCode });
  }

  return NextResponse.json({
    message: error.message,
  },{ status: error.statusCode });
};

export default errorHandler;