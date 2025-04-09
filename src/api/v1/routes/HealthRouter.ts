import { Router } from "express";
import { HealthController } from "../controllers";

const HealthRouter = Router();

HealthRouter.get("/", HealthController.getHealthStatus);

export default HealthRouter;
