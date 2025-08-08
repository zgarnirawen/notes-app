import { getAuth } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { db } from "../../lib/db";
import * as schema from "../../lib/db/schema";
import { eq } from "drizzle-orm";
import DashboardClient from "../../components/dashboard/dashboard-client";

export default async function DashboardPage() {
  const headersList = headers();
  const req = new Request("http://localhost", { headers: headersList });

  // Cast en any pour éviter l'erreur TS (non idéal, mais fonctionnel)
  const { userId } = getAuth(req as any);

  if (!userId) {
    return <div>You are not logged in</div>;
  }

  const userNotesRaw = await db.select().from(schema.notes).where(eq(schema.notes.userId, userId));

  // Convertir Date -> string pour la compatibilité avec DashboardClient
  const userNotes = userNotesRaw.map(note => ({
    ...note,
    createdAt: note.createdAt.toISOString(),
    updatedAt: note.updatedAt.toISOString(),
  }));

  return <DashboardClient userId={userId} notes={userNotes} />;
}
