// src/api/v1/services/user.service.ts
import { UserInput, UserInsert, UserSelect } from "@/api/v1/interfaces";
import { UserRepository } from "@/api/v1/repositories";
import { PasswordService } from "@/api/v1/services";
import { ConflictError } from "@/errors";

export class UserService {
	private readonly userRepository: UserRepository = new UserRepository();
	private readonly passwordService: PasswordService = new PasswordService();

	async create(data: UserInput): Promise<UserSelect> {
		const existingUser = await this.userRepository.getByEmail(data.email);
		if (existingUser) {
			throw new ConflictError("User with this email already exists");
		}

		const passwordHash = await this.passwordService.hash(data.password);
		const insertData: UserInsert = {
			...data,
			passwordHash,
		};

		return this.userRepository.create(insertData);
	}

	async findByEmail(email: string): Promise<UserSelect | null> {
		return this.userRepository.getByEmail(email);
	}

	async getAll(): Promise<UserSelect[]> {
		return this.userRepository.getAll();
	}
}
