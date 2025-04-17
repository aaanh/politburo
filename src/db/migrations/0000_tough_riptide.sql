CREATE TABLE "government_position_hierarchy" (
	"ancestor_id" integer,
	"descendant_id" integer,
	"depth" integer
);
--> statement-breakpoint
CREATE TABLE "government_positions" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "government_position_hierarchy" ADD CONSTRAINT "government_position_hierarchy_ancestor_id_government_positions_id_fk" FOREIGN KEY ("ancestor_id") REFERENCES "public"."government_positions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "government_position_hierarchy" ADD CONSTRAINT "government_position_hierarchy_descendant_id_government_positions_id_fk" FOREIGN KEY ("descendant_id") REFERENCES "public"."government_positions"("id") ON DELETE no action ON UPDATE no action;