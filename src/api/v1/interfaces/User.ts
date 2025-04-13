import { User } from "@/api/v1/models";
import { z } from "zod";

export const userInputSchema = z.object({
	name: z.string(),
	cpf: z.string().regex(/^\d{11}$/, "CPF must have exactly 11 digits"),
	rg: z.string().min(5).max(14),
	oab: z.string().optional(),
	email: z.string().email(),
	password: z.string().min(6),
	birthDate: z.coerce.date(),
});

export type UserInput = z.infer<typeof userInputSchema>;
export type UserInsert = typeof User.$inferInsert;
export type UserSelect = typeof User.$inferSelect;
