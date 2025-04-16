import { UserInsert } from "@/api/v1/interfaces";
import { User } from "@/api/v1/models";
import db from "@/config/db";
import { eq } from "drizzle-orm";

export class UserRepository {
	public async create(data: UserInsert) {
		const result = await db.insert(User).values(data).returning();
		return result;
	}

	public async getAll() {
		const result = await db.select().from(User);
		return result;
	}

	public async getByEmail(email: string) {
		const result = await db.select().from(User).where(eq(User.email, email));
		return result;
	}
}
