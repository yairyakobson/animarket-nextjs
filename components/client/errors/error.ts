import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import genericErrorHandler from "./genericErrors";
import zodErrorHandler from "./zodErrors";

function errorMessage(
  error: FetchBaseQueryError
  | SerializedError
  | undefined){
  if(!error) return "";

  const zod = zodErrorHandler(error);
  if(zod && zod !== "FetchBaseQueryError Unknown Error"){
    return zod;
  }
  
  const generic = genericErrorHandler(error);
  if(generic && generic !== "FetchBaseQueryError Unknown Error"){
    return generic
  };
}

export default errorMessage;