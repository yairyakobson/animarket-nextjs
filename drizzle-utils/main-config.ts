import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { DATABASE_URL } from "@/components/server/constants/env-keys";

import * as schema from "./schemas/index";

const sql = neon(DATABASE_URL!);
export const db = drizzle(sql, { schema });