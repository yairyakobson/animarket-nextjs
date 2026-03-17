import { mongooseCastError } from "./castError";
import { duplicateError } from "./duplicateError";
import { expiredJwtError } from "./expiredJwtError";
import { invalidJwtError } from "./invalidJwtError";

export const knownErrorHandlers = [
  duplicateError,
  mongooseCastError,
  invalidJwtError,
  expiredJwtError
];