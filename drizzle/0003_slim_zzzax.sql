CREATE TABLE IF NOT EXISTS "review_table" (
	"review_id" serial PRIMARY KEY NOT NULL,
	"reviewerId" text NOT NULL,
	"place_id" text NOT NULL,
	"star" integer NOT NULL,
	"comment" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "review_table" ADD CONSTRAINT "review_table_reviewerId_user_table_user_id_fk" FOREIGN KEY ("reviewerId") REFERENCES "user_table"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
