CREATE TABLE IF NOT EXISTS "books" (
	"id" serial PRIMARY KEY NOT NULL,
	"author_name" text DEFAULT '',
	"title" text DEFAULT '',
	"year" text DEFAULT '',
	"created_at" text DEFAULT CURRENT_TIME,
	"updated_at" text DEFAULT CURRENT_TIME
);
