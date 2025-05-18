import { CustomError } from "@/errors/custom.error";

export class ConflictError extends CustomError {
	constructor(message: string = "Conflict") {
		super(message, 409);
	}
}
