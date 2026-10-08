import { 
  pgTable,
  text,
  uuid,
  integer,
  decimal,
  varchar
} from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

import { products } from "./products-schema";
import { users } from "./user-schema";

export const cart = pgTable("cart", {
  id: uuid("id").defaultRandom().primaryKey(),
  user: text("user")
      .references(() => users.name),
  product: text("product_name")
      .references(() => products.name),
  productId: varchar("product_id", { length: 12 })
      .references(() => products.id),
  price: decimal("price", { precision: 10, scale: 2 })
      .references(() => products.price),
  quantity: integer("quantity").default(1),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull()
});

export type Cart = InferSelectModel<typeof cart>;
export type NewCart = InferInsertModel<typeof cart>;