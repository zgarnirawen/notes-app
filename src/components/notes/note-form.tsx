"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createNote, updateNote } from "@/lib/actions/notes";
import { Save, Loader2 } from "lucide-react";
import type { Note } from "@/lib/db/schema";

interface NoteFormProps {
  note?: Note;
  mode?: "create" | "edit";
}

export default function NoteForm({ note, mode = "create" }: NoteFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !content.trim()) {
      setError("Le titre et le contenu sont requis");
      return;
    }

    startTransition(async () => {
      try {
        if (mode === "create") {
          await createNote({ title: title.trim(), content: content.trim() });
          router.push("/dashboard");
        } else if (note) {
          await updateNote(note.id, { 
            title: title.trim(), 
            content: content.trim() 
          });
          router.push(`/dashboard/notes/${note.id}`);
        }
      } catch (err) {
        setError("Une erreur est survenue. Veuillez réessayer.");
        console.error("Erreur lors de la sauvegarde:", err);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-6">
      {/* Titre */}
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium text-gray-700">
          Titre de la note
        </label>
        <Input
          id="title"
          type="text"
          placeholder="Entrez le titre de votre note..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg"
          disabled={isPending}
          required
        />
      </div>

      {/* Contenu */}
      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium text-gray-700">
          Contenu
        </label>
        <Textarea
          id="content"
          placeholder="Écrivez le contenu de votre note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[300px] resize-none"
          disabled={isPending}
          required
        />
      </div>

      {/* Message d'erreur */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-500">
          {title.length > 0 && (
            <span>Titre: {title.length}/200 caractères</span>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isPending}
          >
            Annuler
          </Button>
          
          <Button
            type="submit"
            disabled={isPending || !title.trim() || !content.trim()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Sauvegarde...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                {mode === "create" ? "Créer la note" : "Sauvegarder"}
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}