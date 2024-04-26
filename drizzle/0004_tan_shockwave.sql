CREATE TABLE IF NOT EXISTS "blog_table" (
	"blog_id" serial PRIMARY KEY NOT NULL,
	"writer_id" text NOT NULL,
	"place_id" text NOT NULL,
	"blog_title" text NOT NULL,
	"blog_content" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"tags" text
);
--> statement-breakpoint
ALTER TABLE "review_table" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_table" ADD CONSTRAINT "blog_table_writer_id_user_table_user_id_fk" FOREIGN KEY ("writer_id") REFERENCES "user_table"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
