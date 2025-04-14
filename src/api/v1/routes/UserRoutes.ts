import { Router } from "express";
import { UserController } from "../controllers";
import { UserService } from "@/api/v1/services";
import { UserRepository } from "@/api/v1/repositories";

const UserRoutes = Router();

const userController = new UserController();

UserRoutes.get("/", userController.getAll.bind(userController));
UserRoutes.get("/:id", userController.getById.bind(userController));
UserRoutes.post("/", userController.create.bind(userController));
UserRoutes.put("/:id", userController.update.bind(userController));
UserRoutes.delete("/:id", userController.delete.bind(userController));

export default UserRoutes;
