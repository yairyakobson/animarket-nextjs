import { BAD_REQUEST } from "../../constants/httpCodes"

export const invalidJwtError = (err: unknown) =>{
   if(typeof err === "object" && err !== null
    && "name" in err
    && (err as { name: unknown }).name === "JsonWebTokenError"){
    return{
      statusCode: BAD_REQUEST,
      message: "Invalid JSON Web Token"
    }
  }
}