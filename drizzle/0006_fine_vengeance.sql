CREATE TABLE IF NOT EXISTS "new_explored" (
	"blog_id" serial PRIMARY KEY NOT NULL,
	"writer_id" text NOT NULL,
	"name" text NOT NULL,
	"address" text NOT NULL,
	"lat" text NOT NULL,
	"lon" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"content" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "new_explored" ADD CONSTRAINT "new_explored_writer_id_user_table_user_id_fk" FOREIGN KEY ("writer_id") REFERENCES "user_table"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
