import db from './db';
import { userTable } from './schema';

import type { user } from './schema';
import { eq, lt, gte, ne, inArray, and, or, sql } from 'drizzle-orm';

export async function insertUser(newUser: user) {
	await db.insert(userTable).values(newUser);
}