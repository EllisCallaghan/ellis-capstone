import type {Config} from 'drizzle-kit'
export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  driver: 'turso',
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
    authToken: process.env.DATABASE_AUTH_TOKEN as string,
  },
  // export default {
  //   schema: "./src/db/schema.ts",
  //   out: "./drizzle",
  //   driver: "better-sqlite",
  //   dbCredentials: {
  //     url: "./sqlite.db",
  //   },
} satisfies Config
