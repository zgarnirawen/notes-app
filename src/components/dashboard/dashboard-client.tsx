"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SearchNotes from "@/components/notes/search-notes";
import { formatRelativeDate, truncateText } from "@/lib/utils";
import { PenTool, Plus, FileText } from "lucide-react";
import type { Note } from "@/lib/db/schema";
import type { User } from "@clerk/nextjs/server";

interface DashboardClientProps {
  user: User | null;
  notes: Note[];
}

export default function DashboardClient({ user, notes }: DashboardClientProps) {
  const [filteredNotes, setFilteredNotes] = useState<Note[]>(notes);

  const handleFilteredNotes = useCallback((filtered: Note[]) => {
    setFilteredNotes(filtered);
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Bonjour, {user?.firstName || "Utilisateur"} 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Vous avez {notes.length} note{notes.length !== 1 ? 's' : ''} enregistrée{notes.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link href="/dashboard/notes/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Créer une note
          </Button>
        </Link>
      </div>

      {/* Search Bar */}
      {notes.length > 0 && (
        <div className="max-w-md">
          <SearchNotes notes={notes} onFilteredNotes={handleFilteredNotes} />
        </div>
      )}

      {/* Notes Grid */}
      {notes.length > 0 ? (
        filteredNotes.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredNotes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        ) : (
          <NoSearchResults />
        )
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

function NoteCard({ note }: { note: Note }) {
  return (
    <Link href={`/dashboard/notes/${note.id}`}>
      <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer group">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {truncateText(note.title, 50)}
          </h3>
          <FileText className="h-4 w-4 text-gray-400 flex-shrink-0" />
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {truncateText(note.content, 120)}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Modifiée {formatRelativeDate(note.updatedAt)}</span>
          <span className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
            Voir →
          </span>
        </div>
      </div>
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <PenTool className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Aucune note pour le moment
      </h3>
      <p className="text-gray-600 mb-6 max-w-sm mx-auto">
        Commencez par créer votre première note pour organiser vos idées et vos pensées.
      </p>
      <Link href="/dashboard/notes/new">
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Créer ma première note
        </Button>
      </Link>
    </div>
  );
}

function NoSearchResults() {
  return (
    <div className="text-center py-12">
      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <FileText className="h-6 w-6 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Aucun résultat trouvé
      </h3>
      <p className="text-gray-600">
        Essayez avec d'autres mots-clés ou créez une nouvelle note.
      </p>
    </div>
  );
}