import { and, eq, getTableColumns, or, sum } from "drizzle-orm";

import { db } from "@/drizzle-utils/main-config";
import { cart, NewCart } from "@/drizzle-utils/schemas/cart-schema";
import { products } from "@/drizzle-utils/schemas/products-schema";

const { user, ...cartColumns } = getTableColumns(cart);

export const createNewCartItem = async(query: string) =>{
  const [newCartItemResult] = await db
  .select()
  .from(products)
  .where(eq(products.id, query));
  
  return newCartItemResult;
}

export const insertCartItem = async(query: NewCart) =>{
  const [insertResult] = await db
  .insert(cart)
  .values({ ...query, totalPrice: query.totalPrice.toString() })
  .returning();

  return insertResult;
}

export const userCart = async(query: string) =>{
  const userCartItems = await db
  .select(cartColumns)
  .from(cart)
  .where(eq(cart.user, query));

  return userCartItems;
}

export const updateCartItems = async(username: string, productId: string) =>{
  const [existingCartItems] = await db
  .select()
  .from(cart)
  .where(
    and(
      eq(cart.user, username),
      eq(cart.product, productId)
    )
  );

  return existingCartItems;
}

export const updateCart = async(query: {
  id: string;
  quantity: number;
  totalPrice: string;
}) =>{
  const [updateResult] = await db
  .update(cart)
  .set({ 
    quantity: query.quantity, 
    totalPrice: query.totalPrice 
  })
  .where(eq(cart.id, query.id))
  .returning();

  return updateResult;
}

export const deleteCartItem = async(username: string, itemId: string) =>{
  const removeResult = await db
  .delete(cart)
    .where(
      and(
        eq(cart.user, username),
        eq(cart.productId, itemId)
      )
    )
    .returning();

  return removeResult[0];
}

export const totalPriceCalculator = async(query: string) =>{
  const [calcResult] = await db
  .select({
    totalPrice: sum(cart.totalPrice)
  })
  .from(cart)
  .where(eq(cart.user, query));

  return calcResult.totalPrice ?? "0.00";
}