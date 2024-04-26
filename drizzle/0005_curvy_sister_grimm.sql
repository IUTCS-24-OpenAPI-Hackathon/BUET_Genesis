ALTER TABLE "review_table" RENAME COLUMN "reviewerId" TO "reviewer_id";--> statement-breakpoint
ALTER TABLE "review_table" DROP CONSTRAINT "review_table_reviewerId_user_table_user_id_fk";
--> statement-breakpoint
ALTER TABLE "review_table" ADD COLUMN "reviewer_name" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "review_table" ADD CONSTRAINT "review_table_reviewer_id_user_table_user_id_fk" FOREIGN KEY ("reviewer_id") REFERENCES "user_table"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
