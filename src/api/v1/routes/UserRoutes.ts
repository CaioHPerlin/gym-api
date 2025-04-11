import { Router } from "express";
import { UserController } from "../controllers";

const UserRoutes = Router();

const userService = "TODO USER SERVICE";
const userController = new UserController(userService);

UserRoutes.get("/", userController.getAll);
UserRoutes.get("/:id", userController.getById);
UserRoutes.post("/", userController.create);
UserRoutes.put("/:id", userController.update);
UserRoutes.delete("/:id", userController.delete);

export default UserRoutes;
