import { UpdateUserDto } from "@/api/v1/dtos";
import { UserDbInsert, UserDbSelect, users } from "@/api/v1/models";
import db from "@/config/db";
import { eq } from "drizzle-orm";

export class UsersRepository {
	async create(data: UserDbInsert): Promise<UserDbSelect> {
		const [user] = await db.insert(users).values(data).returning();
		return user;
	}

	async findAll(): Promise<UserDbSelect[]> {
		const data = await db.select().from(users);
		return data;
	}

	async findByEmail(email: string): Promise<UserDbSelect | null> {
		const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
		return user ?? null;
	}

	async findById(id: number): Promise<UserDbSelect | null> {
		const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
		return user ?? null;
	}

	async update(id: number, data: UpdateUserDto): Promise<UserDbSelect> {
		const [user] = await db.update(users).set(data).where(eq(users.id, id)).returning();
		return user;
	}

	async delete(id: number): Promise<UserDbSelect> {
		const [user] = await db.delete(users).where(eq(users.id, id)).returning();
		return user;
	}
}
