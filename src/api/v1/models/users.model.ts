import { integer, pgTable, varchar, timestamp, boolean, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull(),

	email: varchar({ length: 255 }).notNull().unique(),
	password: text().notNull(),
	isActive: boolean().default(true).notNull(),

	createdAt: timestamp().defaultNow().notNull(),
	updatedAt: timestamp().defaultNow().notNull(),
	deletedAt: timestamp(),
});

export type UserDbInsert = typeof users.$inferInsert;
export type UserDbSelect = typeof users.$inferSelect;
