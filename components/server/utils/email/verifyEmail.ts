import { updateUserStatus } from "../../dataAccess/users";
import { createVerificationEmail } from "../../dataAccess/verification";
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from "../../constants/httpCodes";

import appAssert from "../appAssert";
import VerificationCodeType from "../../constants/verificationCodeType";

export const verifyEmail = async(code: string) =>{
  const validCode = await createVerificationEmail({
    _id: code,
    type: VerificationCodeType.EmailVerification,
    expiresAt: { $gt: new Date() }
  });
  appAssert(validCode, NOT_FOUND, "Invalid or expired verification code");

  const updatedUser = await updateUserStatus(
    validCode.name,
    { verified: true },
    { returnDocument: "after" }
  )
  appAssert(updatedUser, INTERNAL_SERVER_ERROR, "Email verification failed");
  await validCode.deleteOne();

  return{
    name: updatedUser.omitPassword()
  }
};