import { CreateUserDto, UpdateUserDto, UserDto } from "@/api/v1/dtos";
import { UserDbSelect } from "@/api/v1/models";
import { UsersRepository } from "@/api/v1/repositories";
import { PasswordService } from "@/api/v1/services";
import { ConflictError, NotFoundError } from "@/errors";

export class UsersService {
	constructor(
		private readonly usersRepository = new UsersRepository(),
		private readonly passwordService = new PasswordService()
	) {}

	async create(data: CreateUserDto): Promise<UserDto> {
		await this.validateEmailUniqueness(data.email);
		const hashedPassword = await this.passwordService.hash(data.password);
		const savedUser = await this.usersRepository.create({
			...data,
			password: hashedPassword,
		});
		return this.toUserDto(savedUser);
	}

	async update(id: number, data: UpdateUserDto): Promise<UserDto> {
		await this.findById(id);
		if (data.email) await this.validateEmailUniqueness(data.email);

		let updateData = data;
		if (data.password) {
			updateData = {
				...updateData,
				password: await this.passwordService.hash(data.password),
			};
		}

		const updatedUser = await this.usersRepository.update(id, updateData);
		return this.toUserDto(updatedUser);
	}

	async findById(id: number): Promise<UserDto> {
		const user = await this.usersRepository.findById(id);
		if (!user) throw new NotFoundError(`User with id ${id} not found`);
		return this.toUserDto(user);
	}

	async findByEmail(email: string): Promise<UserDto | null> {
		const user = await this.usersRepository.findByEmail(email);
		return user ? this.toUserDto(user) : null;
	}

	async findAll(): Promise<UserDto[]> {
		const users = await this.usersRepository.findAll();
		return users.map(this.toUserDto);
	}

	private async validateEmailUniqueness(email: string): Promise<void> {
		if (await this.findByEmail(email)) {
			throw new ConflictError("Email already in use");
		}
	}

	private toUserDto(user: UserDbSelect): UserDto {
		const { password, ...safeUser } = user;
		return safeUser;
	}
}
