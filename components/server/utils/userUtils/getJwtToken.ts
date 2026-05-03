import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../../constants/env-keys";
import { User } from "@/drizzle-utils/schemas";

export function getJwtToken(user: User){
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      public_id: user.public_id,
      url: user.url,
      signed_url: user.signed_url
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}