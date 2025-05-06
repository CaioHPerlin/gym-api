// src/api/v1/services/user.service.ts
import { UserInput, UserInsert, UserSelect } from "@/api/v1/types";
import { UserRepository } from "@/api/v1/repositories";
import { PasswordService } from "@/api/v1/services";
import { ConflictError } from "@/errors";

export class UserService {
	private readonly userRepository: UserRepository = new UserRepository();
	private readonly passwordService: PasswordService = new PasswordService();

	async create(data: UserInput): Promise<UserSelect> {
		const existingUser = await this.userRepository.findByEmail(data.email);
		if (existingUser) {
			throw new ConflictError("There already exists a User with this email address");
		}

		const passwordHash = await this.passwordService.hash(data.password);
		const insertData: UserInsert = {
			...data,
			passwordHash,
		};

		return this.userRepository.create(insertData);
	}

	async findByEmail(email: string): Promise<UserSelect | null> {
		return this.userRepository.findByEmail(email);
	}

	async findById(id: number): Promise<UserSelect | null> {
		return this.userRepository.findById(id);
	}

	async getAll(): Promise<UserSelect[]> {
		return this.userRepository.getAll();
	}
}
