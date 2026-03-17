import assert from "node:assert";

import AppAssert from "../types/appAssertTypes";
import AppError from "./appError";

const appAssert: AppAssert = (
  condition,
  httpStatusCode,
  message
) => assert(condition, new AppError(httpStatusCode, message));

export default appAssert;