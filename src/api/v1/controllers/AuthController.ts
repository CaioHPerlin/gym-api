import { loginInputSchema } from "@/api/v1/interfaces/AuthInterface";
import { AuthService } from "@/api/v1/services";
import { NextFunction, Request, Response } from "express";

export class AuthController {
	private readonly authService: AuthService = new AuthService();

	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const data = loginInputSchema.parse(req.body);

			const response = await this.authService.login(data);
			res.status(200).json(response);
		} catch (err) {
			next(err);
		}
	}
}
