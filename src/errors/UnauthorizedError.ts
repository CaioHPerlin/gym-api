import { CustomError } from "@/errors/CustomError";

export class UnauthorizedError extends CustomError {
	constructor(message: string = "Unauthorized") {
		super(message, 401);
	}
}
