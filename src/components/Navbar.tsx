"use client";

import Link from "next/link";
import { auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "./ui/button";

export default function Navbar() {
  const [user] = useAuthState(auth);

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link href="/" className="font-bold text-xl">Tasking Platform</Link>
      <div className="space-x-4 flex items-center">
        {user ? (
          <>
            <Button variant="ghost" asChild className="text-white hover:bg-gray-700">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button variant="ghost" asChild className="text-white hover:bg-gray-700">
              <Link href="/dashboard/tasks/new">Post Task</Link>
            </Button>
            <Button variant="outline" onClick={() => auth.signOut()} className="border-white text-white hover:bg-white hover:text-gray-800">
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" asChild className="text-white hover:bg-gray-700">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
