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
export type review = typeof reviewTable.$inferInsert;

export const userTable = pgTable('user_table', {
	userId: text('user_id').primaryKey().notNull(),
	userName: text('user_name').notNull(),
	email: text('email').notNull(),
    imageLink: text('image_link')
});

export const reviewTable = pgTable('review_table', {
	reviewId: serial('review_id').primaryKey().notNull(),
	reviewerId: text('reviewerId').notNull().references(() => userTable.userId, { onDelete: 'cascade' })
	.notNull(),
	placeId: text('place_id').notNull(),
	star: integer('star').notNull(),
	comment: text('comment').notNull()
})

