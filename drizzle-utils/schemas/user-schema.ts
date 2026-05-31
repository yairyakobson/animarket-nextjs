import { 
  pgTable,
  boolean,
  text,
  timestamp,
  uuid,
  varchar
} from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  status: varchar("status", { length: 50 }).default("Offline"),
  password: text("password").notNull(),
  avatar: text("avatar").notNull(),
  public_id: text("public_id"),
  url: text("url"),
  signed_url: text("signed_url"),
  role: varchar("role", { length: 50 }).default("User"),
  verified: boolean("verified").default(false).notNull(),
  resetPasswordToken: text("reset_password_token"),
  resetPasswordExpire: timestamp("reset_password_expire"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;