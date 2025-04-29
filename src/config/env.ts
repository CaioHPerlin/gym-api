// src/config/env.ts
import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
	POSTGRES_USER: z.string(),
	POSTGRES_PASSWORD: z.string(),
	POSTGRES_PORT: z
		.string()
		.refine((str) => [...str].every((char) => "0123456789".includes(char))),
	POSTGRES_DB: z.string(),
	PORT: z.string().optional(),
	DEBUG: z.string().optional(),
	NODE_ENV: z.enum(["development", "production"]).optional(),
	ACCESS_TOKEN_SECRET: z.string(),
	REFRESH_TOKEN_SECRET: z.string(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
	console.error("❌ Invalid environment variables:", parsed.error.format());
	throw new Error("Invalid environment configuration.");
}

const env = parsed.data;

export default {
	...env,
	DEBUG: env.DEBUG === "true",
	POSTGRES_URL: `postgres://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}@localhost:${env.POSTGRES_PORT}/${env.POSTGRES_DB}`,
};
