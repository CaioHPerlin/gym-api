import { Router } from "express";
import { UserController } from "../controllers";
import { UserService } from "@/api/v1/services";
import { UserRepository } from "@/api/v1/repositories";

const UserRoutes = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

UserRoutes.get("/", userController.getAll);
UserRoutes.get("/:id", userController.getById);
UserRoutes.post("/", userController.create);
UserRoutes.put("/:id", userController.update);
UserRoutes.delete("/:id", userController.delete);

export default UserRoutes;
