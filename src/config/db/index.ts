import env from "@/config/env";
import { drizzle } from "drizzle-orm/node-postgres";

const db = drizzle(env.POSTGRES_URL);
