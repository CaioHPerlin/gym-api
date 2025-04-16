import * as bcrypt from "bcrypt";

export class AuthService {
	private readonly SALT_ROUNDS = 10;

	async hashPassword(password: string) {
		const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
		return await bcrypt.hash(password, salt);
	}

	async comparePassword(password: string, hash: string) {
		return await bcrypt.compare(password, hash);
	}
}
