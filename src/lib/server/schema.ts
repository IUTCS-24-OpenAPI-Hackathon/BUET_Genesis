import {
	pgTable,
	serial,
	text,
	boolean,
	integer,
	json,
	timestamp,
	primaryKey
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export type user = typeof userTable.$inferInsert;

export const userTable = pgTable('user_table', {
	userId: text('user_id').primaryKey().notNull(),
	userName: text('user_name').notNull(),
	email: text('email').notNull(),
    imageLink: text('image_link')
});

