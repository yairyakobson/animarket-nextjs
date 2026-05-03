import { and, eq, gt, sql } from "drizzle-orm";

import { db } from "@/drizzle-utils/main-config";
import { users } from "@/drizzle-utils/schemas/user-schema";
import { verificationCodes } from "@/drizzle-utils/schemas";

export const findUserPassword = async(email: string) =>{
  const [userPasswordFinderResult] = await db
  .select()
  .from(users)
  .where(eq(users.email, email))
  .limit(1);
  
  return userPasswordFinderResult;
}

export const resetPasswordRecord = async(query: {
  userId: string;
  resetPasswordToken: string;
  resetPasswordExpire: Date;
}) =>{
  const [resetPasswordRecordResult] = await db
  .update(users)
  .set({
    resetPasswordToken: query.resetPasswordToken,
    resetPasswordExpire: query.resetPasswordExpire
  })
  .where(eq(users.id, query.userId))
  .returning()

  return resetPasswordRecordResult;
}

export const updateResettedPassword = async(token: string) =>{
  const [resetPasswordResult] = await db
  .select()
  .from(users)
  .where(
    and(
      eq(users.resetPasswordToken, token),
      gt(users.resetPasswordExpire, sql`now()`)
    )
  )
  .limit(1);

  return resetPasswordResult;
};

export const hashResettedPassword = async(
  hashedNewPassword: string,
  user: { id: string }
) =>{
  const [hashedPasswordResult] = await db
  .update(users)
  .set({
    password: hashedNewPassword,
    resetPasswordToken: null,
    resetPasswordExpire: null
  })
  .where(eq(users.id, user.id))
  .returning();

  return hashedPasswordResult;
};

export const deleteResetPasswordEntry = async(query: {
  userId: string,
  type: string
}) =>{
  return await db
  .delete(verificationCodes)
  .where(
    and(
      eq(verificationCodes.userId, query.userId),
      eq(verificationCodes.type, query.type)
    )
  );
}