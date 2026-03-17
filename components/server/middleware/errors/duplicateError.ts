import { CONFLICT } from "../../constants/httpCodes";

export const duplicateError = (err: unknown) =>{
   if(typeof err === "object" && err !== null
    && "code" in err
    && (err as { code: unknown }).code === 11000){
    return{
      statusCode: CONFLICT,
      message: "User and/or Email Address already exists"
    }
  }
}