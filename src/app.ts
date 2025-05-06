import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import v1 from "@/api/v1/routes";
import { errorHandler } from "@/middleware";
import { initDB } from "@/config/db";

export async function createApp() {
	// Initialize DB
	await initDB();

	const app = express();

	// General Middleware
	app.use(cors());
	app.use(cookieParser());
	app.use(express.json());

	// 3. API Routes
	app.use("/api/v1", v1);

	// Global error handler
	app.use(errorHandler);

	return app;
}
