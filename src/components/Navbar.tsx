"use client";

import Link from "next/link";
import { auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "./ui/button";
import Logo from "./logo";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const handleSignOut = () => {
    auth.signOut();
    router.push('/');
  };

  return (
    <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-primary">TaskFlow</Link>
      <div className="space-x-2 flex items-center">
        {user ? (
          <>
            <Button variant="ghost" asChild><Link href="/dashboard" className="text-foreground hover:text-primary">Dashboard</Link></Button>
            <Button variant="ghost" asChild><Link href="/dashboard/tasks/new" className="text-foreground hover:text-primary">Post Task</Link></Button>
            <Button variant="ghost" asChild><Link href="/leaderboard" className="text-foreground hover:text-primary">Leaderboard</Link></Button>
            <Button variant="ghost" asChild><Link href="/admin" className="text-foreground hover:text-primary">Admin</Link></Button>
            <Button variant="ghost" onClick={handleSignOut} className="text-destructive hover:text-destructive/80">Logout</Button>
          </>
        ) : (
          <>
            <Button variant="ghost" asChild><Link href="/login" className="text-foreground hover:text-primary">Login</Link></Button>
            <Button asChild><Link href="/signup">Sign Up</Link></Button>
          </>
        )}
      </div>
    </header>
  );
}
