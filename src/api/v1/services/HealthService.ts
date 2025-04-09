import { ServiceUnavailableError } from "@/errors";
import { HealthStatus } from "../interfaces";

class HealthService {
	public static get healthStatus(): HealthStatus {
		return {
			status: "UP",
			version: "1.0.0",
		};
	}
}

export default HealthService;
