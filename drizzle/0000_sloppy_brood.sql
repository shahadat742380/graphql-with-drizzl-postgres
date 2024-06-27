CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" text DEFAULT '',
	"lat_name" text DEFAULT '',
	"email" text DEFAULT '',
	"created_at" text DEFAULT CURRENT_TIME,
	"updated_at" text DEFAULT CURRENT_TIME
);
