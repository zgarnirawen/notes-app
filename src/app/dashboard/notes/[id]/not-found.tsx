import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileX, ArrowLeft } from "lucide-react";

export default function NoteNotFound() {
  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <FileX className="h-8 w-8 text-gray-400" />
      </div>
      
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Note introuvable
      </h1>
      
      <p className="text-gray-600 mb-8">
        La note que vous recherchez n'existe pas ou a été supprimée.
      </p>
      
      <Link href="/dashboard">
        <Button>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour au dashboard
        </Button>
      </Link>
    </div>
  );
}