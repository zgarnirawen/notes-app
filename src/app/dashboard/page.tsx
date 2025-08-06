import { getUserNotes } from "@/lib/actions/notes";
import { currentUser } from "@clerk/nextjs/server";
import DashboardClient from "@/components/dashboard/dashboard-client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, PenTool, Plus } from "lucide-react";
import { truncateText, formatRelativeDate } from "@/lib/utils";

export default async function DashboardPage() {
  const user = await currentUser();
  const notes = await getUserNotes();

  return (
    <DashboardClient 
      user={user} 
      notes={notes} 
    />
  );
}

function NoteCard({ note }: { note: any }) {
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
