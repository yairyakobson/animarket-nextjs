import bcrypt from "bcrypt";

export const hashValue = async(val: string) =>
  bcrypt.hash(val, 10);