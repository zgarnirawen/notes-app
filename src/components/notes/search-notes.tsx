"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Note } from "@/lib/db/schema";

interface SearchNotesProps {
  notes: Note[];
  onFilteredNotes: (filteredNotes: Note[]) => void;
}

export default function SearchNotes({ notes, onFilteredNotes }: SearchNotesProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNotes = useMemo(() => {
    if (!searchTerm.trim()) {
      return notes;
    }

    const term = searchTerm.toLowerCase();
    return notes.filter(note => 
      note.title.toLowerCase().includes(term) ||
      note.content.toLowerCase().includes(term)
    );
  }, [notes, searchTerm]);

  // Mettre à jour les notes filtrées quand elles changent
  useMemo(() => {
    onFilteredNotes(filteredNotes);
  }, [filteredNotes, onFilteredNotes]);

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Rechercher dans vos notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {searchTerm && (
        <div className="mt-2 text-sm text-gray-600">
          {filteredNotes.length} résultat{filteredNotes.length !== 1 ? 's' : ''} pour "{searchTerm}"
        </div>
      )}
    </div>
  );
}