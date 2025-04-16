// src/api/v1/services/user.service.ts
import { UserInput, UserInsert } from "@/api/v1/interfaces";
import { UserRepository } from "@/api/v1/repositories";
import { PasswordService } from "@/api/v1/services/PasswordService";
import { ConflictError } from "@/errors";

export class UserService {
	private readonly userRepository: UserRepository = new UserRepository();
	private readonly passwordService: PasswordService = new PasswordService();

	async create(data: UserInput) {
		const existingUser = await this.userRepository.getByEmail(data.email);
		if (existingUser) {
			throw new ConflictError("User with this email already exists");
		}

		const passwordHash = await this.passwordService.hashPassword(data.password);
		const insertData: UserInsert = {
			...data,
			passwordHash,
		};

		return this.userRepository.create(insertData);
	}

	async findByEmail(email: string) {
		return this.userRepository.getByEmail(email);
	}

	async getAll() {
		return this.userRepository.getAll();
	}
}
