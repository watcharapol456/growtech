import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const userreport = pgTable("userreport", {
  id: serial("id").primaryKey(),
  description: text("description").notNull(),
  topic:text("topic").notNull(),
  name: text('name').notNull()
});
