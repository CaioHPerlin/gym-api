import { Request, Response, NextFunction } from "express";
import { NotImplementedError, ServiceUnavailableError } from "@/errors";
import { UserService } from "@/api/v1/services";
import { UserInput, userInputSchema } from "@/api/v1/interfaces";

export class UserController {
	private userService: UserService = new UserService();

	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const data = userInputSchema.parse(req.body);

			const newUser = await this.userService.create(data);
			res.status(200).json(newUser);
		} catch (error) {
			next(error);
		}
	}

	async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const data = await this.userService.getAll();

			res.status(200).json(data);
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
