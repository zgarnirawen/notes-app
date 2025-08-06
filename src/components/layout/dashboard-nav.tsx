import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { PenTool, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardNav() {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center space-x-2">
            <PenTool className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Notes App</span>
          </Link>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/notes/new">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle note
              </Button>
            </Link>
            
            {/* User Button Clerk */}
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8"
                }
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}