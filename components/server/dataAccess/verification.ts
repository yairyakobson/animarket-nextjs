import verificationCodeSchema from "../schemas/mongoose/VerificationCode";

export const createVerificationEmail = async(query: {
  _id: string;
  type: string;
  expiresAt: { $gt: Date };
}) =>{
  return await verificationCodeSchema.findOne(query);
}

export const createVerificationCode = async(query: {
  name: unknown;
  type: string;
  expiresAt: Date;
}) =>{
  return await verificationCodeSchema.create(query);
}

export const createResetPasswordEmail = async(query: {
  name: unknown;
  type: string;
  createdAt: { $gt: Date }
}) =>{
  return await verificationCodeSchema.countDocuments(query);
}

export const createResetPasswordCode = async(query: {
  name: unknown;
  token: string;
  type: string;
  expiresAt: Date;
}) =>{
  return await verificationCodeSchema.create(query);
}