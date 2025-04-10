import express from "express";
import cors from "cors";

import env from "@/config/env";
import v1 from "@/api/v1/routes";
import { errorHandler } from "@/middleware";

const app = express();
const PORT = env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Route
app.use("/api/v1", v1);

// Error Handler
app.use(errorHandler);

// Run Server
app.listen(PORT, () => {
	console.log(`[INFO] Server is running on http://localhost:${PORT}`);
});
