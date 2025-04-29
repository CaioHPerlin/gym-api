import z from "zod";

export const loginInputSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

export type LoginInput = z.infer<typeof loginInputSchema>;

// JWT
export type JWTAccessPayload = {
	sub: string;
	email: string;
	name: string;
};

export type JWTRefreshPayload = {
	sub: string;
};
