import { getNoteById } from "@/lib/actions/notes";
import { notFound } from "next/navigation";
import NoteDetailClient from "@/components/notes/note-detail-client";

interface NotePageProps {
  params: {
    id: string;
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const note = await getNoteById(params.id);

  if (!note) {
    notFound();
  }

  return <NoteDetailClient note={note} />;
}