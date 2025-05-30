import { CustomError } from "@/errors/custom.error";

export class ServiceUnavailableError extends CustomError {
	constructor(message: string = "Service Unavailable") {
		super(message, 503);
	}
}
