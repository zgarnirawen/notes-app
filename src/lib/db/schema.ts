import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Table des notes
export const notes = pgTable("notes", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  userId: text("user_id").notNull(), // ID Clerk de l'utilisateur
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Schemas Zod pour la validation
export const insertNoteSchema = createInsertSchema(notes, {
  title: z.string().min(1, "Le titre est requis").max(200, "Le titre est trop long"),
  content: z.string().min(1, "Le contenu est requis"),
});

export const selectNoteSchema = createSelectSchema(notes);

// Types TypeScript
export type Note = typeof notes.$inferSelect;
export type NewNote = typeof notes.$inferInsert;
export type UpdateNote = Partial<Omit<NewNote, "id" | "userId" | "createdAt">>;