import CustomError from "./CustomError";

class NotImplementedError extends CustomError {
	constructor(functionality: string = "Funcionality") {
		const message = functionality + " not implemented";
		super(message, 501);
	}
}

export default NotImplementedError;
