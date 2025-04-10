import { Router } from "express";
import HealthRoutes from "./HealthRoutes";

const v1 = Router();

v1.use("/health", HealthRoutes);

export default v1;
