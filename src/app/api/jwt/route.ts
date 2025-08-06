import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET() {
  // Récupérer la session utilisateur via Clerk (auth asynchrone)
  const { userId } = await auth();

  // Si pas d'utilisateur connecté, on bloque l'accès
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Générer un token JWT avec payload { sub: userId }
  const token = jwt.sign(
    { sub: userId }, // payload
    process.env.JWT_SECRET || "default_secret", // clé secrète (à mettre en .env ou dashboard Vercel)
    { expiresIn: "1h" } // expiration du token
  );

  // Retourner le token JWT au client
  return NextResponse.json({ token });
}
