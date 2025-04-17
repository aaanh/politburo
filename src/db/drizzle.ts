import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { neon, neonConfig } from "@neondatabase/serverless";

import ws from "ws";

neonConfig.webSocketConstructor = ws;

const sql = neon(process.env.DATABASE_URL!);

config({ path: ".env.local" }); // or .env.local

export const db = drizzle({ client: sql });
