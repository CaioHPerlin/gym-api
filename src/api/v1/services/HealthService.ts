import { ServiceUnavailableError } from "@/errors";
import { HealthStatus } from "../interfaces";

class HealthService {
	public static get healthStatus(): HealthStatus {
		throw new ServiceUnavailableError();

		return {
			status: "UP",
			version: "1.0.0",
		};
	}
}

export default HealthService;
