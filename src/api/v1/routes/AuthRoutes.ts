import { Router } from "express";
import { AuthController } from "../controllers";

const AuthRoutes = Router();

const authController = new AuthController();

AuthRoutes.post("/", authController.login.bind(authController));

export default AuthRoutes;
