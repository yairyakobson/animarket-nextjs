import { HttpStatusCode } from "../constants/httpCodes";

type AppAssert = (
  condition: any,
  httpStatusCode: HttpStatusCode,
  message: string
) => asserts condition;

export default AppAssert;