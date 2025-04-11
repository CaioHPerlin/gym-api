import { Router } from "express";
import UserRoutes from "@/api/v1/routes/UserRoutes";
import HealthRoutes from "@/api/v1/routes/HealthRoutes";

const v1 = Router();

v1.use("/health", HealthRoutes);
v1.use("/users", UserRoutes);

export default v1;
