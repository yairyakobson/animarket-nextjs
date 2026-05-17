import { CONFLICT } from "../../constants/httpCodes";

export const duplicateSQLError = (err: unknown) => {
  const isDuplicate = 
    typeof err === "object" && err !== null && (
      (err as any).cause?.code === "23505"
    );

  if(isDuplicate){
    return {
      statusCode: CONFLICT,
      message: "You already created a product with the same name"
    };
  }
};