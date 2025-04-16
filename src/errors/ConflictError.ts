import { CustomError } from "@/errors/CustomError";

export class ConflictError extends CustomError {
	constructor(message: string = "Conflict") {
		super(message, 503);
	}
}
