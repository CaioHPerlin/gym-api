import { UserService } from "./UserService";
import { PasswordService } from "./PasswordService";
import { UnauthorizedError } from "@/errors";
import { JWTAccessPayload, JWTRefreshPayload, LoginInput } from "@/api/v1/types";
import * as jwt from "jsonwebtoken";
import env from "@/config/env";

export class AuthService {
	private readonly userService = new UserService();
	private readonly passwordService = new PasswordService();

	async login({ email, password }: LoginInput): Promise<{
		accessToken: string;
		refreshToken: string;
	}> {
		const user = await this.userService.findByEmail(email);
		if (!user) throw new UnauthorizedError("Invalid credentials");

		const isValidPassword = await this.passwordService.compare(
			password,
			user.passwordHash
		);
		if (!isValidPassword) throw new UnauthorizedError("Invalid credentials");
		if (!user.isActive) throw new UnauthorizedError("This account is currently disabled");

		// User exists and credentials are valid. Sign JWTs.
		const accessPayload: JWTAccessPayload = {
			sub: user.id.toString(),
			email: user.email,
			name: user.name,
		};

		const refreshPayload: JWTRefreshPayload = {
			sub: accessPayload.sub,
		};

		const accessToken = jwt.sign(accessPayload, env.ACCESS_TOKEN_SECRET, {
			expiresIn: "30m",
		});

		const refreshToken = jwt.sign(refreshPayload, env.REFRESH_TOKEN_SECRET, {
			expiresIn: "1d",
		});

		return { accessToken, refreshToken };
	}
}
