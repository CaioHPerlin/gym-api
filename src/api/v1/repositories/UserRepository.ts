import { user } from "@/api/v1/models";
import db from "@/config/db";

export class UserRepository {
	public async getAll() {
		const result = await db.select().from(user);
		return result;
	}
}
