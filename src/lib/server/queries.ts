import db from './db';
import { userTable, reviewTable} from './schema';

import type { user, review } from './schema';
import { eq, lt, gte, ne, inArray, and, or, sql } from 'drizzle-orm';

export async function insertUser(newUser: user) {
	await db.insert(userTable).values(newUser);
}

export async function insertReview(newReview: review){
	await db.insert(reviewTable).values(newReview)
}

export async function getPlaceReview(placeId: text){
	return await db.select().from(reviewTable).where(eq(reviewTable.placeId, placeId))
}