import { Suspense } from "react";
import NoteForm from "@/components/notes/note-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NewNotePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nouvelle note</h1>
          <p className="text-gray-600 mt-1">
            Créez une nouvelle note pour organiser vos idées
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <Suspense fallback={<div className="p-8">Chargement...</div>}>
          <NoteForm />
        </Suspense>
      </div>
    </div>
  );
}