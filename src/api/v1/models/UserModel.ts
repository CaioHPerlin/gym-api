import {
	integer,
	pgTable,
	varchar,
	timestamp,
	boolean,
	text,
	date,
} from "drizzle-orm/pg-core";

export const User = pgTable("user", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull(),
	cpf: varchar({ length: 11 }).notNull().unique(), // 11 digits, only numbers
	rg: varchar({ length: 14 }).notNull().unique(), // Accepts alphanumerics
	oab: varchar({ length: 20 }), // Optional, varies a lot

	email: varchar({ length: 255 }).notNull().unique(),
	passwordHash: text().notNull(),

	birthDate: date().notNull(),
	isActive: boolean().default(true).notNull(),

	createdAt: timestamp().defaultNow().notNull(),
	updatedAt: timestamp().defaultNow().notNull(),
	deletedAt: timestamp(),
});
