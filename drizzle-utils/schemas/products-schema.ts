import { 
  pgTable,
  decimal,
  integer,
  real,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel, sql } from "drizzle-orm";
import { customAlphabet } from "nanoid";

import { users } from "./user-schema";

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 12);

export const products = pgTable("products", {
  id: varchar("id", { length: 12 }).primaryKey().$defaultFn(() => nanoid()),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).default("1.00").notNull(),
  stock: integer("stock").default(1).notNull(),
  category: text("category").notNull(),
  condition: text("condition").notNull(),
  seller: text("seller")
      .references(() => users.name),
  public_id: text("public_id"),
  url: text("url"),
  signed_url: text("signed_url"),
  totalReviews: integer("total_reviews").default(0),
  averageRating: real("average_rating").default(0.0),
  createdAt: timestamp("created_at").defaultNow().notNull()
}, (table) =>[
  uniqueIndex("seller_index").on(sql`lower(${table.name})`)
]);

export type Products = InferSelectModel<typeof products>;
export type NewProduct = InferInsertModel<typeof products>;