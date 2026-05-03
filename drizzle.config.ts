import { defineConfig } from "drizzle-kit";
import { DATABASE_URL } from "./components/server/constants/env-keys";

export default defineConfig({
  schema: "./drizzle-utils/schemas/*.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL!,
  }
});