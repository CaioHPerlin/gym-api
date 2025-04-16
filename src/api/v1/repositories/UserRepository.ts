import { UserInsert, UserSelect } from "@/api/v1/interfaces";
import { User } from "@/api/v1/models";
import db from "@/config/db";
import { eq } from "drizzle-orm";

export class UserRepository {
	public async create(data: UserInsert): Promise<UserSelect> {
		const [user] = await db.insert(User).values(data).returning();
		return user;
	}

	public async getAll(): Promise<UserSelect[]> {
		const users = await db.select().from(User);
		return users;
	}

	public async getByEmail(email: string): Promise<UserSelect | null> {
		const [user] = await db.select().from(User).where(eq(User.email, email)).limit(1);
		return user ?? null;
	}
}
