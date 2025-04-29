import { CustomError } from "@/errors/CustomError";

export class ForbiddenError extends CustomError {
	constructor(message: string = "Forbidden") {
		super(message, 403);
	}
}
