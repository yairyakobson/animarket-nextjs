import { NOT_FOUND } from "../../constants/httpCodes"

export const mongooseCastError = (err: unknown) =>{
   if(typeof err === "object" && err !== null
    && "name" in err
    && (err as { name: unknown }).name === "CastError"){
    return{
      statusCode: NOT_FOUND,
      message: `Resource Not Found. Invalid: ${(err as any).path}`
    }
  }
}