import { Router } from "express";
import { HealthController } from "../controllers";

const HealthRoutes = Router();

HealthRoutes.get("/", HealthController.getHealthStatus);

export default HealthRoutes;
