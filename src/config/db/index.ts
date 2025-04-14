import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import env from "@/config/env";

const pool = new Pool({
	connectionString: env.POSTGRES_URL,
	connectionTimeoutMillis: 2000,
	idleTimeoutMillis: 10000,
});

export async function initDB() {
	try {
		await pool.query("SELECT 1");
	} catch (err) {
		console.error("❌ Database connection failed");
		throw err; // Re-throw
	}
}

export async function closeDB() {
	await pool.end();
}

// Export Drizzle instance
const db = drizzle(pool);
export default db;
