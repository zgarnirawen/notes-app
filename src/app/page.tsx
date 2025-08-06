import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PenTool, Shield, Zap, Users } from "lucide-react";

export default async function HomePage() {
  const session = await auth() as { userId: string | null };
  const userId = session?.userId;

  // Si l'utilisateur est connecté, le rediriger vers le dashboard
  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <PenTool className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Notes App</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/sign-in">
              <Button variant="ghost">Se connecter</Button>
            </Link>
            <Link href="/sign-up">
              <Button>S'inscrire</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Vos notes,{" "}
          <span className="text-blue-600">organisées</span> et{" "}
          <span className="text-indigo-600">sécurisées</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Créez, organisez et gérez vos notes personnelles avec une interface moderne 
          et une sécurité de niveau professionnel.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/sign-up">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Commencer gratuitement
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button size="lg" variant="outline">
              J'ai déjà un compte
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Pourquoi choisir Notes App ?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Une application pensée pour votre productivité et votre tranquillité d'esprit.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<PenTool className="h-8 w-8" />}
            title="Interface intuitive"
            description="Créez et éditez vos notes avec une interface moderne et épurée."
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8" />}
            title="Sécurité avancée"
            description="Vos données sont protégées avec un système d'authentification robuste."
          />
          <FeatureCard
            icon={<Zap className="h-8 w-8" />}
            title="Rapide et réactif"
            description="Accédez instantanément à vos notes depuis n'importe quel appareil."
          />
          <FeatureCard
            icon={<Users className="h-8 w-8" />}
            title="Personnel et privé"
            description="Chaque note vous appartient. Aucun partage non désiré."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 Notes App. By Rawen Zgarni</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
