import { Router } from "express";
import UserRoutes from "@/api/v1/routes/UserRoutes";
import HealthRoutes from "@/api/v1/routes/HealthRoutes";
import AuthRoutes from "@/api/v1/routes/AuthRoutes";

const v1 = Router();

v1.use("/health", HealthRoutes);
v1.use("/users", UserRoutes);
v1.use("/auth", AuthRoutes);

export default v1;
