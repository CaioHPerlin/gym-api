import { UserInput, UserInsert } from "@/api/v1/interfaces";
import { UserRepository } from "@/api/v1/repositories";

export class UserService {
	private userRepository: UserRepository = new UserRepository();

	async create(data: UserInput) {
		const insertData: UserInsert = { ...data, passwordHash: "testehash" };

		return await this.userRepository.create(insertData);
	}

	async getAll() {
		return this.userRepository.getAll();
	}
}
