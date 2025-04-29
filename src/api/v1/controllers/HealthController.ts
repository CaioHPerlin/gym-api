import { Request, Response } from "express";
import { HealthStatus } from "../types";
import { HealthService } from "../services";

export class HealthController {
	public static getHealthStatus(_: Request, res: Response): void {
		const healthStatus: HealthStatus = HealthService.healthStatus;

		res.status(200).json(healthStatus);
	}
}
