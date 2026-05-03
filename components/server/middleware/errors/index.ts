import { duplicateError } from "./duplicateError";
import { expiredJwtError } from "./expiredJwtError";
import { invalidJwtError } from "./invalidJwtError";

export const knownErrorHandlers = [
  duplicateError,
  invalidJwtError,
  expiredJwtError
];