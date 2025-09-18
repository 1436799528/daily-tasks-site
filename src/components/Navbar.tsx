"use client";

import Link from "next/link";
import { auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const handleSignOut = () => {
    auth.signOut();
    router.push('/');
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link href="/" className="text-2xl font-bold text-primary">TaskFlow</Link>
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <Button variant="ghost" asChild><Link href="/dashboard" className="transition hover:text-primary">Dashboard</Link></Button>
            <Button variant="ghost" asChild><Link href="/dashboard/tasks/new" className="transition hover:text-primary">Post Task</Link></Button>
            <Button variant="ghost" asChild><Link href="/leaderboard" className="transition hover:text-primary">Leaderboard</Link></Button>
            <Button variant="ghost" asChild><Link href="/admin" className="transition hover:text-primary">Admin</Link></Button>
            <Button variant="ghost" onClick={handleSignOut} className="text-red-500 hover:text-red-700 transition">Logout</Button>
          </>
        ) : (
          <>
            <Button variant="ghost" asChild><Link href="/login" className="transition hover:text-primary">Login</Link></Button>
            <Button asChild><Link href="/signup">Sign Up</Link></Button>
          </>
        )}
      </div>
    </nav>
  );
}
