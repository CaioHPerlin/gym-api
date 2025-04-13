import { UserInput } from "@/api/v1/interfaces";
import { UserRepository } from "@/api/v1/repositories";

export class UserService {
	private userRepository: UserRepository = new UserRepository();

	async create(data: UserInput) {
		// check
	}

	async getAll() {
		return this.userRepository.getAll();
	}
}
