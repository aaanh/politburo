CREATE TABLE "people" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "position_assignments" (
	"id" serial PRIMARY KEY NOT NULL,
	"position_id" integer NOT NULL,
	"person_id" integer NOT NULL,
	"start_date" timestamp DEFAULT now() NOT NULL,
	"end_date" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "government_position_hierarchy" ALTER COLUMN "depth" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "government_positions" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "government_positions" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "position_assignments" ADD CONSTRAINT "position_assignments_position_id_government_positions_id_fk" FOREIGN KEY ("position_id") REFERENCES "public"."government_positions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "position_assignments" ADD CONSTRAINT "position_assignments_person_id_people_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."people"("id") ON DELETE no action ON UPDATE no action;