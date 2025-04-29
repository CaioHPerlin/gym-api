import { UserSelect } from "@/api/v1/types";

declare global {
	namespace Express {
		interface Request {
			user?: Pick<UserSelect, "id" | "email" | "name">;
		}
	}
}
