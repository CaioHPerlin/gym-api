import { Request, Response, NextFunction } from "express";
import { NotImplementedError } from "@/errors";
import { UserService } from "@/api/v1/services";

export class UserController {
	private userService: UserService = new UserService();

	create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			throw new NotImplementedError("Create");
		} catch (error) {
			next(error);
		}
	};

	getAll = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const data = await this.userService.getAll();

			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	};

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
