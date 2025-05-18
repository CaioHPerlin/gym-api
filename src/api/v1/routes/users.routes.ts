import { Router } from "express";
import { UserController } from "../controllers";
import { authenticate } from "@/middleware";

const UserRoutes = Router();
const userController = new UserController();

UserRoutes.get("/", userController.findAll.bind(userController));
UserRoutes.get("/:id", userController.findById.bind(userController));
UserRoutes.post("/", userController.create.bind(userController));
UserRoutes.patch("/:id", userController.update.bind(userController));
UserRoutes.delete("/:id", userController.delete.bind(userController));

export default UserRoutes;
