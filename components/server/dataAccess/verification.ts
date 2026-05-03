import { and, eq, gt } from "drizzle-orm";

import { db } from "@/drizzle-utils/main-config";
import { verificationCodes } from "@/drizzle-utils/schemas";

export const createVerificationEmail = async(query: {
  userId: string;
  type: string;
}) =>{
  const [verificationEmailResult] = await db
  .select()
  .from(verificationCodes)
  .where(
    and(
      eq(verificationCodes.userId, query.userId),
      eq(verificationCodes.type, query.type),
      gt(verificationCodes.expiresAt, new Date())
    )
  )
  .limit(1);

  return verificationEmailResult;
}

export const createVerificationCode = async(query: {
  userId: string;
  type: string;
  expiresAt: Date;
}) =>{
  const [verificationCode] = await db
  .insert(verificationCodes)
  .values({
    userId: query.userId,
    type: query.type,
    expiresAt: query.expiresAt
  })
  .returning();

  return verificationCode;
}

export const deleteVerificationCodeEntry = async(validCode: string) =>{
  return await db
  .delete(verificationCodes)
  .where(eq(verificationCodes.id, validCode));
}

export const createResetPasswordEmail = async(query: {
  userId: string;
  type: string;
}) =>{
  const [ResetPasswordEmailResult] = await db
  .select()
  .from(verificationCodes)
  .where(
    and(
      eq(verificationCodes.userId, query.userId),
      eq(verificationCodes.type, query.type),
      gt(verificationCodes.expiresAt, new Date())
    )
  )
  .limit(1);

  return ResetPasswordEmailResult;
}

export const createResetPasswordCode = async(query: {
  userId: string;
  type: string;
  expiresAt: Date;
}) =>{
  const [resetPasswordCode] = await db
  .insert(verificationCodes)
  .values({
    userId: query.userId,
    type: query.type,
    expiresAt: query.expiresAt
  })
  .returning();

  return resetPasswordCode;
}