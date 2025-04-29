import { UserService } from "./UserService";
import { PasswordService } from "./PasswordService";
import { UnauthorizedError } from "@/errors";
import { LoginInput } from "@/api/v1/interfaces/AuthInterface";
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
		const payload = {
			sub: user.id,
			email: user.email,
			name: user.name,
		};

		const accessToken = jwt.sign(payload, env.ACCESS_TOKEN_SECRET, {
			expiresIn: "30m",
		});

		const refreshToken = jwt.sign({ sub: payload.sub }, env.REFRESH_TOKEN_SECRET, {
			expiresIn: "1d",
		});

		return { accessToken, refreshToken };
	}
}
