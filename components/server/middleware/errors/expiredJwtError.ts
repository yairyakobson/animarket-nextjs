import { BAD_REQUEST } from "../../constants/httpCodes"

export const expiredJwtError = (err: unknown) =>{
   if(typeof err === "object" && err !== null
    && "name" in err
    && (err as { name: unknown }).name === "TokenExpiredError"){
    return{
      statusCode: BAD_REQUEST,
      message: "Your JSON Web Token has expired"
    }
  }
}