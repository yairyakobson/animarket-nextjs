import { INTERNAL_SERVER_ERROR, NOT_FOUND } from "../constants/httpCodes";
import {
  createVerificationEmail,
  deleteVerificationCodeEntry
} from "../dataAccess/verification";

import { updateUserStatus } from "../dataAccess/users";
import { omitPassword } from "../utils/userUtils/omitPassword";

import appAssert from "../utils/appAssert";
import VerificationCodeType from "../constants/verificationCodeType";

export const userStatusUpdate = async(code: string) =>{
  const validCode = await createVerificationEmail({
    userId: code,
    type: VerificationCodeType.EmailVerification
  });
  appAssert(validCode, NOT_FOUND, "Invalid or expired verification code");

  const updatedUser = await updateUserStatus(
    validCode.userId,
    { verified: true }
  );
  appAssert(updatedUser, INTERNAL_SERVER_ERROR, "Email verification failed");
  await deleteVerificationCodeEntry(validCode.id);

  return{
    user: omitPassword(updatedUser)
  }
};