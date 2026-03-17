import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

function zodErrorHandler(
  error: FetchBaseQueryError
  | SerializedError
  | undefined): string{
  if(!error) return "";

  if("status" in error && "data" in error){
    const data = error.data as any; // contains { error: issues[] }

    if(Array.isArray(data?.error) && data.error.length > 0){
      return data.error[0].message; // first Zod error message
    }
    return "FetchBaseQueryError Unknown Error";
  }
  return "SerializedError Unknown Error";
}

export default zodErrorHandler;