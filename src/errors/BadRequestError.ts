import { CustomError } from "@/errors/CustomError";

export class BadRequestError extends CustomError {
	constructor(message: string = "Bad Request") {
		super(message, 400);
	}
}
