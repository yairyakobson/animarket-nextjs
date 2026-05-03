import bcrypt from "bcrypt";

export async function comparePassword(enteredPassword: string, hashed: string){
  return await bcrypt.compare(enteredPassword, hashed);
}