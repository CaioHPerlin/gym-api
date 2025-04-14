// src/index.ts
import { createApp } from "./app";
import { closeDB } from "@/config/db";
import env from "@/config/env";

const PORT = { env };

async function bootstrap() {
	// Create configured app
	const app = await createApp();

	// Start server
	const server = app.listen(PORT, () => {
		console.log(`[SERVER] Running on http://localhost:${PORT}`);
	});

	// Graceful shutdown
	const shutdown = async () => {
		console.log("[SERVER] Gracefully shutting down...");
		server.close(async () => {
			await closeDB();
			process.exit(0);
		});
	};

	process.once("SIGTERM", shutdown);
	process.once("SIGINT", shutdown);
}

// Execution
bootstrap().catch((err) => {
	console.error("❌ Server startup failed:", err);
	process.exit(1);
});
