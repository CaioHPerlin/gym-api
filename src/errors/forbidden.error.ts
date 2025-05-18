import { CustomError } from "@/errors/custom.error";

export class ForbiddenError extends CustomError {
	constructor(message: string = "Forbidden") {
		super(message, 403);
	}
}
