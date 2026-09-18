"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: "/" })}
      className="px-6 py-3 bg-white text-gray-700 font-bold rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 hover:text-red-600 transition-all flex items-center gap-2"
    >
      <LogOut size={18} />
      <span className="hidden sm:inline">Sign Out</span>
    </button>
  );
}
