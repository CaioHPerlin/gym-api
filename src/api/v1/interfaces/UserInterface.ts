import { User } from "@/api/v1/models";
import { z } from "zod";

export const userInputSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string().min(6),
	birthDate: z.string().date(),
});

export type UserInput = z.infer<typeof userInputSchema>;
export type UserInsert = typeof User.$inferInsert;
export type UserSelect = typeof User.$inferSelect;
