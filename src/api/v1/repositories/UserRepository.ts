import { User } from "@/api/v1/models";
import db from "@/config/db";

export class UserRepository {
	public async create(data: typeof User.$inferInsert) {
		const result = await db.insert(User).values(data);
		return result;
	}

	public async getAll() {
		const result = await db.select().from(User);
		return result;
	}
}
