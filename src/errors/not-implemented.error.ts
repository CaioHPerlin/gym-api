import { CustomError } from "@/errors/custom.error";

export class NotImplementedError extends CustomError {
	constructor(functionality: string = "Funcionality") {
		const message = functionality + " not implemented";
		super(message, 501);
	}
}
