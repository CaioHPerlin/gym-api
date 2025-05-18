import { Request, Response, NextFunction } from "express";
import { NotImplementedError } from "@/errors";
import z from "zod";
import { createUserSchema, updateUserSchema } from "@/api/v1/schemas";
import { UsersService } from "@/api/v1/services";

export class UserController {
	private idParamsSchema = z.object({
		id: z.coerce.number().positive().int(),
	});

	constructor(private readonly userService: UsersService = new UsersService()) {}

	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const newUser = createUserSchema.parse(req.body);

			const data = await this.userService.create(newUser);
			res.status(201).json(data);
		} catch (error) {
			next(error);
		}
	}

	async findAll(_: Request, res: Response, next: NextFunction) {
		try {
			const data = await this.userService.findAll();

			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}

	async findById(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = this.idParamsSchema.parse(req.params);
			const data = await this.userService.findById(id);

			res.status(200).json(data);
		} catch (error) {
			next(error);
		}
	}

	async update(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = this.idParamsSchema.parse(req.params);
			const body = updateUserSchema.parse(req.body);

			const data = await this.userService.update(id, body);
			res.status(200).json(data);
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
