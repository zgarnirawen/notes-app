"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { notes } from "@/lib/db/schema";
import { eq, desc, and } from "drizzle-orm";

export async function getUserNotes() {
  try {
    const { userId } = await auth();
    if (!userId) {
      console.error("❌ Utilisateur non authentifié.");
      throw new Error("Utilisateur non authentifié.");
    }

    console.log("🟢 getUserNotes pour userId =", userId);

    const userNotes = await db
      .select()
      .from(notes)
      .where(eq(notes.userId, userId))
      .orderBy(desc(notes.updatedAt));

    console.log("🟢 Notes récupérées:", userNotes.length);
    return userNotes;
  } catch (error) {
    console.error("❌ Erreur dans getUserNotes:", error);
    throw error; // Propager l'erreur pour que le caller la récupère
  }
}

export async function getNoteById(noteId: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      console.error("❌ Utilisateur non authentifié.");
      throw new Error("Utilisateur non authentifié.");
    }

    const result = await db
      .select()
      .from(notes)
      .where(and(eq(notes.id, noteId), eq(notes.userId, userId)))
      .limit(1);

    return result[0] || null;
  } catch (error) {
    console.error("❌ Erreur dans getNoteById:", error);
    throw error;
  }
}

export async function createNote(data: { title: string; content: string }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      console.error("❌ Utilisateur non authentifié.");
      throw new Error("Utilisateur non authentifié.");
    }

    if (!data.title?.trim() || !data.content?.trim()) {
      throw new Error("Le titre et le contenu sont obligatoires.");
    }

    const newNote = await db.insert(notes).values({
      title: data.title.trim(),
      content: data.content.trim(),
      userId,
    }).returning();

    return newNote[0];
  } catch (error) {
    console.error("❌ Erreur dans createNote:", error);
    throw error;
  }
}

export async function updateNote(noteId: string, data: { title?: string; content?: string }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      console.error("❌ Utilisateur non authentifié.");
      throw new Error("Utilisateur non authentifié.");
    }

    const updates: Partial<{ title: string; content: string; updatedAt: Date }> = {};
    if (data.title !== undefined) updates.title = data.title.trim();
    if (data.content !== undefined) updates.content = data.content.trim();
    updates.updatedAt = new Date();

    const [updatedNote] = await db
      .update(notes)
      .set(updates)
      .where(and(eq(notes.id, noteId), eq(notes.userId, userId)))
      .returning();

    if (!updatedNote) {
      throw new Error("Note non trouvée.");
    }

    return updatedNote;
  } catch (error) {
    console.error("❌ Erreur dans updateNote:", error);
    throw error;
  }
}

export async function deleteNote(noteId: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      console.error("❌ Utilisateur non authentifié.");
      throw new Error("Utilisateur non authentifié.");
    }

    const [deletedNote] = await db
      .delete(notes)
      .where(and(eq(notes.id, noteId), eq(notes.userId, userId)))
      .returning();

    if (!deletedNote) {
      throw new Error("Note non trouvée.");
    }

    return deletedNote;
  } catch (error) {
    console.error("❌ Erreur dans deleteNote:", error);
    throw error;
  }
}
