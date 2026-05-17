import { duplicateSQLError } from "./duplicateSQLError";
import { expiredJwtError } from "./expiredJwtError";
import { invalidJwtError } from "./invalidJwtError";

export const knownErrorHandlers = [
  duplicateSQLError,
  invalidJwtError,
  expiredJwtError
];