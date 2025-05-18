import z from "zod";

export const createUserSchema = z.object({
	name: z.string().min(2),
	email: z.string().email(),
	password: z.string().min(6),
});

export const updateUserSchema = z
	.object({
		name: z.string().min(2).optional(),
		email: z.string().email().optional(),
		password: z.string().min(6).optional(),
	})
	.refine(
		(data) => {
			return Object.keys(data).length > 0;
		},
		{
			message: "At least one field must be provided for update",
			path: ["name", "email", "password"],
		}
	);
