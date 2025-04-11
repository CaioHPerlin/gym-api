import { integer, pgTable, varchar, timestamp, boolean, text } from "drizzle-orm/pg-core";

const user = pgTable("user", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull().unique(),
	passwordHash: text().notNull(), // Store hashed passwords
	age: integer(),
	isActive: boolean().default(true).notNull(), // For soft deletes or account status
	createdAt: timestamp().defaultNow().notNull(), // Automatically set on creation
	updatedAt: timestamp().defaultNow().notNull(), // Automatically updated on modification
	deletedAt: timestamp(), // For soft deletes
});

export default user;
