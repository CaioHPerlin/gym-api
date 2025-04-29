import { JWTAccessPayload } from "@/api/v1/types";
import env from "@/config/env";
import { ForbiddenError, UnauthorizedError } from "@/errors";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export const authenticate = (req: Request, _: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;
	const accessToken = authHeader?.split(" ")[1];
	if (!accessToken) throw new UnauthorizedError("Missing access token");

	try {
		const accessPayload = jwt.verify(
			accessToken,
			env.ACCESS_TOKEN_SECRET
		) as JWTAccessPayload;

		req.user = {
			id: parseInt(accessPayload.sub),
			email: accessPayload.email,
			name: accessPayload.name,
		};

		next();
	} catch (err) {
		throw new ForbiddenError("Invalid access token");
	}
};
