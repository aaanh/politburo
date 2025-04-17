import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const governmentPositions = pgTable("government_positions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
});

export const governmentPositionHierarchy = pgTable(
  "government_position_hierarchy",
  {
    ancestorId: integer("ancestor_id").references(() => governmentPositions.id),
    descendantId: integer("descendant_id").references(
      () => governmentPositions.id
    ),
    depth: integer("depth").notNull(), // 0 = self, 1 = direct child, etc.
  }
);
