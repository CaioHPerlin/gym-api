import { UnauthorizedError } from "@/errors";
import { JWTAccessPayload, JWTRefreshPayload, LoginInput } from "@/api/v1/types";
import * as jwt from "jsonwebtoken";
import env from "@/config/env";
import { PasswordService } from "@/api/v1/services";
import { UserDbSelect } from "@/api/v1/models";
import { UsersRepository } from "@/api/v1/repositories";

export class AuthService {
	private readonly usersRepository = new UsersRepository();
	private readonly passwordService = new PasswordService();

	async login({ email, password }: LoginInput): Promise<{
		user: UserDbSelect;
		accessToken: string;
		refreshToken: string;
	}> {
		const user = await this.usersRepository.findByEmail(email);
		if (!user) throw new UnauthorizedError("Invalid credentials");

		const isValidPassword = await this.passwordService.compare(password, user.password);
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

		return { user, accessToken, refreshToken };
	}

	async refresh(refreshToken: string): Promise<{
		user: UserDbSelect;
		accessToken: string;
	}> {
		const payload = jwt.verify(
			refreshToken,
			env.REFRESH_TOKEN_SECRET
		) as JWTRefreshPayload;

		const user = await this.usersRepository.findById(parseInt(payload.sub));
		if (!user) throw new UnauthorizedError("Invalid credentials");
		if (!user.isActive) throw new UnauthorizedError("This account is currently disabled");

		const accessPayload: JWTAccessPayload = {
			sub: payload.sub,
			email: user.email,
			name: user.name,
		};

		const accessToken = jwt.sign(accessPayload, env.ACCESS_TOKEN_SECRET, {
			expiresIn: "30m",
		});

		return {
			user,
			accessToken,
		};
	}
}
