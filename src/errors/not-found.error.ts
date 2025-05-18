import { CustomError } from "@/errors/custom.error";

export class NotFoundError extends CustomError {
	constructor(message: string = "Not Found") {
		super(message, 404);
	}
}
