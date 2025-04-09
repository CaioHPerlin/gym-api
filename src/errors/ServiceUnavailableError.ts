import CustomError from "./CustomError";

class ServiceUnavailableError extends CustomError {
	constructor(message: string = "Service Unavailable") {
		super(message, 503);
	}
}

export default ServiceUnavailableError;
