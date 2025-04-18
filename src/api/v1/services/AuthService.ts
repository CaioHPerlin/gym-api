import { UserService } from "./UserService";
import { PasswordService } from "./PasswordService";
import { UnauthorizedError } from "@/errors";
import { UserSelect } from "@/api/v1/interfaces";
import { LoginInput } from "@/api/v1/interfaces/AuthInterface";

export class AuthService {
	private readonly userService = new UserService();
	private readonly passwordService = new PasswordService();

	async login({
		email,
		password,
	}: LoginInput): Promise<{ user: UserSelect; token: string }> {
		const user = await this.userService.findByEmail(email);
		if (!user) throw new UnauthorizedError("Invalid credentials");

		const isValidPassword = await this.passwordService.compare(
			password,
			user.passwordHash
		);
		if (!isValidPassword) throw new UnauthorizedError("Invalid credentials");

		if (!user.isActive) throw new UnauthorizedError("This account is currently disabled");

		const token = this.generateMockToken(user.id); // TODO Replace with real logic
		return { user, token };
	}

	private generateMockToken(userId: number): string {
		return `token-for-${userId}`;
	}
}
