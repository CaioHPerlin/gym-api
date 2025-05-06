import { UserInsert, UserSelect } from "@/api/v1/types";
import { User } from "@/api/v1/models";
import db from "@/config/db";
import { eq } from "drizzle-orm";

export class UserRepository {
	async create(data: UserInsert): Promise<UserSelect> {
		const [user] = await db.insert(User).values(data).returning();
		return user;
	}

	async getAll(): Promise<UserSelect[]> {
		const users = await db.select().from(User);
		return users;
	}

	async findByEmail(email: string): Promise<UserSelect | null> {
		const [user] = await db.select().from(User).where(eq(User.email, email)).limit(1);
		return user ?? null;
	}

	async findById(id: number): Promise<UserSelect | null> {
		const [user] = await db.select().from(User).where(eq(User.id, id)).limit(1);
		return user ?? null;
	}
}
