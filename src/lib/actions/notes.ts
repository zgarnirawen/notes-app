"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { notes } from "@/lib/db/schema";
import { eq, desc, and } from "drizzle-orm";

// 🔍 Récupérer toutes les notes de l'utilisateur courant
export async function getUserNotes() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Utilisateur non authentifié.");

    const userNotes = await db
      .select()
      .from(notes)
      .where(eq(notes.userId, userId))
      .orderBy(desc(notes.updatedAt));

    return userNotes;
  } catch (error) {
    console.error("❌ Erreur dans getUserNotes:", error);
    throw new Error("Impossible de récupérer les notes.");
  }
}

// 🔍 Récupérer une note spécifique par son ID (UUID string)
export async function getNoteById(noteId: string) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Utilisateur non authentifié.");

    const result = await db
      .select()
      .from(notes)
      .where(and(eq(notes.id, noteId), eq(notes.userId, userId)))
      .limit(1);

    return result[0] || null;
  } catch (error) {
    console.error("❌ Erreur dans getNoteById:", error);
    throw new Error("Impossible de récupérer la note.");
  }
}

// 📝 Créer une nouvelle note (title + content obligatoire)
export async function createNote(data: { title: string; content: string }) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Utilisateur non authentifié.");

    const newNote = await db.insert(notes).values({
      title: data.title.trim(),
      content: data.content.trim(),
      userId,
      // createdAt et updatedAt sont auto générés avec defaultNow()
    }).returning();

    return newNote[0];
  } catch (error) {
    console.error("❌ Erreur dans createNote:", error);
    throw new Error("Impossible de créer la note.");
  }
}

// ✏️ Mettre à jour une note (noteId en string)
export async function updateNote(noteId: string, data: { title?: string; content?: string }) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Utilisateur non authentifié.");

    const [updatedNote] = await db
      .update(notes)
      .set({ ...data, updatedAt: new Date() })
      .where(and(eq(notes.id, noteId), eq(notes.userId, userId)))
      .returning();

    if (!updatedNote) throw new Error("Note non trouvée.");

    return updatedNote;
  } catch (error) {
    console.error("❌ Erreur dans updateNote:", error);
    throw new Error("Impossible de mettre à jour la note.");
  }
}

// 🗑️ Supprimer une note (noteId en string)
export async function deleteNote(noteId: string) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Utilisateur non authentifié.");

    const [deletedNote] = await db
      .delete(notes)
      .where(and(eq(notes.id, noteId), eq(notes.userId, userId)))
      .returning();

    if (!deletedNote) throw new Error("Note non trouvée.");

    return deletedNote;
  } catch (error) {
    console.error("❌ Erreur dans deleteNote:", error);
    throw new Error("Impossible de supprimer la note.");
  }
}
