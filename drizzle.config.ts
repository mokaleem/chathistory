import { defineConfig } from "drizzle-kit";
import { env } from "@/app/data/env/server";

export default defineConfig({
  out: "./app/drizzle/migrations",
  schema: "./app/drizzle/schema.ts",
  dialect: "postgresql",
  strict: true,
  verbose: true,
  dbCredentials: {
    url: env.DATABASE_URL!,
  },
});
