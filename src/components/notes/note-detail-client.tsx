"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { deleteNote } from "@/lib/actions/notes";
import { ArrowLeft, Edit3, Trash2, Loader2 } from "lucide-react";
import type { Note } from "@/lib/db/schema";
import NoteForm from "./note-form";

interface NoteDetailClientProps {
  note: Note;
}

export default function NoteDetailClient({ note }: NoteDetailClientProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette note ? Cette action est irréversible.")) {
      startTransition(async () => {
        try {
          await deleteNote(note.id);
          router.push("/dashboard");
        } catch (error) {
          console.error("Erreur lors de la suppression:", error);
          alert("Erreur lors de la suppression de la note");
        }
      });
    }
  };

  if (isEditing) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header en mode édition */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(false)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Annuler
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Modifier la note</h1>
              <p className="text-gray-600 mt-1">
                Apportez les modifications nécessaires à votre note
              </p>
            </div>
          </div>
        </div>

        {/* Formulaire d'édition */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <NoteForm note={note} mode="edit" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{note.title}</h1>
            <p className="text-gray-600 mt-1">
              Créée le {formatDate(note.createdAt)} • 
              Modifiée le {formatDate(note.updatedAt)}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            disabled={isPending}
          >
            <Edit3 className="h-4 w-4 mr-2" />
            Modifier
          </Button>
          
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Suppression...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                Supprimer
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Contenu de la note */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-8">
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap text-gray-900 leading-relaxed">
              {note.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}