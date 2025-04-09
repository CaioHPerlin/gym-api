import { Router } from "express";
import HealthRouter from "./HealthRouter";

const v1 = Router();

v1.use("/health", HealthRouter);

export default v1;
