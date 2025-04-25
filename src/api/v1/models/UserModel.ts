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

	email: varchar({ length: 255 }).notNull().unique(),
	passwordHash: text().notNull(),
	isActive: boolean().default(true).notNull(),

	createdAt: timestamp().defaultNow().notNull(),
	updatedAt: timestamp().defaultNow().notNull(),
	deletedAt: timestamp(),
});
