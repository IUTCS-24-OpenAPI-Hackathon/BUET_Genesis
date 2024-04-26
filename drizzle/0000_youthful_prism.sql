CREATE TABLE IF NOT EXISTS "user_table" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"user_name" text NOT NULL,
	"email" text NOT NULL
);
