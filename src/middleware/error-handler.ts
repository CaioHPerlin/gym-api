import env from "@/config/env";
import { CustomError, ValidationError } from "@/errors";
import { getErrorMessage } from "@/utils";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export const errorHandler = (
	err: unknown,
	_: Request,
	res: Response,
	next: NextFunction
): void => {
	// Debug error handling
	if (res.headersSent || env.DEBUG) {
		next(err);
		return;
	}

	// Validation error handling
	if (err instanceof ValidationError || err instanceof ZodError) {
		// Convert ZodError to ValidationError
		if (err instanceof ZodError) {
			err = ValidationError.fromZodError(err);
		}

		// Type assertion
		const validationError = err as ValidationError;

		res.status(validationError.statusCode).json({
			error: {
				message: validationError.message,
				details: validationError.errors,
			},
		});
		return;
	}

	// Regular custom error handling
	if (err instanceof CustomError) {
		res.status(err.statusCode).json({
			error: {
				message: err.message,
			},
		});
		return;
	}

	// General error handling
	res.status(500).json({
		error: {
			message: getErrorMessage(err) || "Internal Server Error",
		},
	});
};
