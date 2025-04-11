import { UserRepository } from "@/api/v1/repositories";

export class UserService {
	private userRepository: UserRepository = new UserRepository();

	async getAll() {
		return this.userRepository.getAll();
	}
}
