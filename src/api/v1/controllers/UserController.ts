import { Request, Response, NextFunction } from "express";
import { NotImplementedError } from "@/errors";

// TODO USER SERVICE
type UserService = any;

class UserController {
	constructor(private readonly userService: UserService) {}

	async create(req: Request, res: Response, next: NextFunction) {
		try {
			throw new NotImplementedError("Create");
		} catch (error) {
			next(error);
		}
	}

	async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			throw new NotImplementedError("Get all");
		} catch (error) {
			next(error);
		}
	}

	async getById(req: Request, res: Response, next: NextFunction) {
		try {
			throw new NotImplementedError("Get by Id");
		} catch (error) {
			next(error);
		}
	}

	async update(req: Request, res: Response, next: NextFunction) {
		try {
			throw new NotImplementedError("Update");
		} catch (error) {
			next(error);
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		try {
			throw new NotImplementedError("Delete");
		} catch (error) {
			next(error);
		}
	}
}

export default UserController;
