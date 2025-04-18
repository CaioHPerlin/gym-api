import * as bcrypt from "bcrypt";

export class PasswordService {
	private readonly saltRounds = 10;

	async hash(password: string): Promise<string> {
		return bcrypt.hash(password, this.saltRounds);
	}

	async compare(raw: string, hash: string): Promise<boolean> {
		return bcrypt.compare(raw, hash);
	}
}
