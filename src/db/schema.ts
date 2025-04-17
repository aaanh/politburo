import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const people = pgTable("people", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const governmentPositions = pgTable("government_positions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const governmentPositionHierarchy = pgTable(
  "government_position_hierarchy",
  {
    ancestorId: integer("ancestor_id").references(() => governmentPositions.id),
    descendantId: integer("descendant_id").references(() => governmentPositions.id),
    depth: integer("depth").notNull(),
  }
);

export const positionAssignments = pgTable("position_assignments", {
  id: serial("id").primaryKey(),
  positionId: integer("position_id").references(() => governmentPositions.id).notNull(),
  personId: integer("person_id").references(() => people.id).notNull(),
  startDate: timestamp("start_date").defaultNow().notNull(),
  endDate: timestamp("end_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
