import {
  pgTable,
  integer,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { customAlphabet } from "nanoid";

import { products } from "./products-schema";
import { users } from "./user-schema";

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 12);

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productId: varchar("product_id", { length: 12 })
          .$defaultFn(() => nanoid())
          .references(() => products.id)
          .notNull(),
  reviewer: text("reviewer")
          .references(() => users.name)
          .notNull(),
  rating: integer("rating").default(1),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow().notNull()
}, (table) =>[
  uniqueIndex("reviewer_index").on(table.productId, table.reviewer)
]);

export type Reviews = InferSelectModel<typeof reviews>;
export type NewReview = InferInsertModel<typeof reviews>;