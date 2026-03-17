import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

function genericErrorHandler(
  error: FetchBaseQueryError
  | SerializedError
  | undefined): string{
  if(!error) return "";
  console.log("GENERIC ERROR:", JSON.stringify(error, null, 2));

  // FetchBaseQueryError
  if("status" in error && "data" in error){
    const data = error.data as {
      error?: { message?: string };
      message?: string;
      statusCode?: number;
    };
    return data?.error?.message
    || data?.message
    || "FetchBaseQueryError Unknown Error";
  }

  // SerializedError
  if("message" in error && typeof error.message === "string"){
    return error.message;
  }
  return "SerializedError Unknown Error";
}

export default genericErrorHandler;