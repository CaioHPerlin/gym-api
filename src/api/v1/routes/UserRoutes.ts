import { Router } from "express";
import { UserController } from "../controllers";
import { authenticate } from "@/middleware";

const UserRoutes = Router();
const userController = new UserController();

UserRoutes.use(authenticate);

UserRoutes.get("/", userController.getAll.bind(userController));
UserRoutes.get("/:id", userController.getById.bind(userController));
UserRoutes.post("/", userController.create.bind(userController));
UserRoutes.put("/:id", userController.update.bind(userController));
UserRoutes.delete("/:id", userController.delete.bind(userController));

export default UserRoutes;
