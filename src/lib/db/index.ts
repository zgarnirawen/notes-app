import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is missing");
}

// Utilisation de ReturnType pour le typage exact
const sql = neon(connectionString) as ReturnType<typeof neon>;

export const db = drizzle(sql, { schema });
