import crypto from "crypto";

import User from "../schemas/mongoose/User";
import verificationModel from "../schemas/mongoose/VerificationCode";

export const findUserPassword = async(email: string) =>{
  return await User.findOne({ email });
}

export const updateResettedPassword = async(plainToken: string) =>{
  const hashedToken = crypto
  .createHash("sha256")
  .update(plainToken)
  .digest("hex");

  return await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() }
  }).select("+password");
};

export const deleteResetPasswordEntry = async(query: {
  name: string,
  type: string
}) =>{
  return await verificationModel.deleteOne(query);
}