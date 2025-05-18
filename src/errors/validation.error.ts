import { CustomError } from "@/errors/custom.error";
import { ZodError } from "zod";

export class ValidationError extends CustomError {
	public readonly errors: Record<string, string[] | undefined>;
	public readonly zodError?: ZodError;

	constructor(
		message: string = "Validation Failed",
		errors: Record<string, string[] | undefined> = {}
	) {
		super(message, 400);
		this.errors = errors;
	}

	static fromZodError(zodError: ZodError): ValidationError {
		const errors: Record<string, string[] | undefined> = zodError.flatten().fieldErrors;

		return new ValidationError("Validation Failed", errors);
	}
}
