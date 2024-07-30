import jwt from "jsonwebtoken";

import config from "../config/config.js";

export function verifyToken(token: string) {
  if (token) {
    const decoded = jwt.verify(token, config.jwtSecret as string);
    return decoded;
  }

  return { message: "token is null", status: 400 };
}
