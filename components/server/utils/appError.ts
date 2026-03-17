import { HttpStatusCode } from "../constants/httpCodes";

class AppError extends Error{
  constructor(
    public statusCode: HttpStatusCode,
    public message: string
  ){
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;