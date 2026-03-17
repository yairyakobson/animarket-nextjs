import bcrypt from "bcrypt";

export const compareValue = async(val: string, hashedValue: string) =>{
  return await bcrypt
  .compare(val, hashedValue);
}