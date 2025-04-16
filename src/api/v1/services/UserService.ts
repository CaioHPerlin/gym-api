import { UserInput, UserInsert } from "@/api/v1/interfaces";
import { UserRepository } from "@/api/v1/repositories";
import { AuthService } from "@/api/v1/services";
import { ConflictError } from "@/errors";

export class UserService {
	private userRepository: UserRepository = new UserRepository();
	private authService: AuthService = new AuthService();

	async create(data: UserInput) {
		const existingUser = await this.userRepository.getByEmail(data.email);
		if (existingUser) {
			throw new ConflictError("User with this email already exists");
		}

		const passwordHash = await this.authService.hashPassword(data.password);
		const insertData: UserInsert = {
			...data,
			passwordHash: passwordHash,
		};
		return await this.userRepository.create(insertData);
	}

	async getAll() {
		return await this.userRepository.getAll();
	}
}
