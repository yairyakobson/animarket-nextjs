import { 
  pgTable,
  varchar,
  timestamp,
  text,
  integer,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { customAlphabet } from "nanoid";

import { users } from "./user-schema";

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 12);

export const products = pgTable("products", {
  id: varchar("id", { length: 12 }).primaryKey().$defaultFn(() => nanoid()),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  price: integer("price").default(0).notNull(),
  category: text("category").notNull(),
  condition: text("condition").default("New").notNull(),
  stock: integer("stock").default(0).notNull(),
  seller: text("seller")
      .references(() => users.name),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  totalReviews: integer("total_reviews").default(0),
  averageRating: integer("average_rating").default(0),
}, (table) =>[
  uniqueIndex("seller_index").on(table.name, table.seller)
]);

export type Products = InferSelectModel<typeof products>;
export type NewProduct = InferInsertModel<typeof products>;