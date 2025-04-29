import { loginInputSchema } from "@/api/v1/types/AuthTypes";
import { AuthService } from "@/api/v1/services";
import { NextFunction, Request, Response } from "express";

export class AuthController {
	private readonly authService: AuthService = new AuthService();

	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const data = loginInputSchema.parse(req.body);

			const { user, accessToken, refreshToken } = await this.authService.login(data);

			res.cookie("refreshToken", refreshToken, {
				path: "/auth/refresh", // TODO: Not yet implemented
				httpOnly: true,
				secure: true,
				sameSite: "strict",
				maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
			});
			res.status(200).json({ user, accessToken });
		} catch (err) {
			next(err);
		}
	}
}
