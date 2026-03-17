import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../../constants/env-keys";

export function verifyJwtToken(token: string){
  return jwt.verify(token, JWT_SECRET);
}