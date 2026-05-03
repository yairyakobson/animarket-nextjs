import { eq, or } from "drizzle-orm";

import { db } from "@/drizzle-utils/main-config";
import { User, users } from "@/drizzle-utils/schemas";

export const registerUser = async ({ name, email }: {
  name: string;
  email: string
}) => {
  const [registrationResult] = await db
  .select()
  .from(users)
  .where(
    or(
      eq(users.name, name),
      eq(users.email, email)
    )
  )
  .limit(1);

  return registrationResult;
}

export const insertUser = async(query: {
  name: string;
  email: string;
  password: string;
  avatar: string;
}) =>{
  const [insertResult] = await db
  .insert(users)
  .values(query)
  .returning();

  return insertResult;
}

export const loginUser = async(email: string) =>{
  const [loginResult] = await db
  .select()
  .from(users)
  .where(eq(users.email, email))
  .limit(1);

  return loginResult;
}

export const fetchUser = async(query: string) =>{
  const [fetchResult] = await db
  .select()
  .from(users)
  .where(
    or(
      eq(users.id, query),
      eq(users.name, query)
    )
  )
  .limit(1);

  return fetchResult;
}

export const fetchUserById = async(query: string) =>{
  const [fetchUserIdResult] = await db
  .select()
  .from(users)
  .where(eq(users.id, query))
  .limit(1);

  return fetchUserIdResult;
}

export const userStatus = async(query: string, status: string) =>{
  const [userStatusResult] = await db
  .update(users)
  .set({ status })
  .where(eq(users.id, query))
  .returning();

   return userStatusResult;
}

export const updateUserStatus = async(
  userId: string,
  query: Partial<User>
) =>{
  const [updateUserResult] = await db
  .update(users)
  .set(query)
  .where(eq(users.id, userId))
  .returning();

  return updateUserResult;
}

export const updateUserPassword = async(id: string, hashedPass: string) =>{
  const [updatePasswordResult] = await db
  .update(users)
  .set({ password: hashedPass })
  .where(eq(users.id, id))
  .returning();

   return updatePasswordResult;
}

export const uploadUserImage = async(
  userId: string,
  image: {
    public_id: string,
    url: string,
    signed_url: string
  }
) =>{
  const [uploadImageResult] = await db
  .update(users)
  .set({
    public_id: image.public_id,
    url: image.url,
    signed_url: image.signed_url
  })
  .where(eq(users.id, userId))
  .returning();

  return uploadImageResult;
}

export const deleteUserImage = async(
  userId: string
) =>{
  const [deleteImageResult] = await db
  .update(users)
  .set({
    public_id: null,
    url: null,
    signed_url: null
  })
  .where(eq(users.id, userId))
  .returning();

  return deleteImageResult;
}