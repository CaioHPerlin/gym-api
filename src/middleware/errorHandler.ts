import env from "@/config/env";
import { CustomError } from "@/errors";
import { getErrorMessage } from "@/utils";
import { NextFunction, Request, Response } from "express";

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

	// Custom error handling
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
