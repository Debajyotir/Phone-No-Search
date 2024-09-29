import "dotenv/config";
import { Pool,neonConfig } from '@neondatabase/serverless';
import ws from "ws";
import { drizzle } from 'drizzle-orm/neon-serverless';
import * as schema from "./schema";

neonConfig.webSocketConstructor = ws;

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
export const db = drizzle(pool,{schema})