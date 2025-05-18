import { ServiceUnavailableError } from "@/errors";
import { HealthStatus } from "../types";

export class HealthService {
	public static get healthStatus(): HealthStatus {
		return {
			status: "UP",
			version: "1.0.0",
		};
	}
}
