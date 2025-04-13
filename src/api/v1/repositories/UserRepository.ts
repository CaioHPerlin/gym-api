import { UserInsert } from "@/api/v1/interfaces";
import { User } from "@/api/v1/models";
import db from "@/config/db";

export class UserRepository {
	public async create(data: UserInsert) {
		const result = await db.insert(User).values(data).returning();
		return result;
	}

	public async getAll() {
		const result = await db.select().from(User);
		return result;
	}
}
