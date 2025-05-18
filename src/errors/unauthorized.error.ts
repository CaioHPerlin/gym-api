import { CustomError } from "@/errors/custom.error";

export class UnauthorizedError extends CustomError {
	constructor(message: string = "Unauthorized") {
		super(message, 401);
	}
}
