import { Router } from "express";
import { AuthController } from "../controllers";

const AuthRoutes = Router();

const authController = new AuthController();

AuthRoutes.post("/login", authController.login.bind(authController));
AuthRoutes.post("/refresh", authController.refresh.bind(authController));

export default AuthRoutes;
