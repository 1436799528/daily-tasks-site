"use client";

import Link from "next/link";
import { auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = () => {
    auth.signOut();
    router.push('/');
  };

  const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Post Task", href: "/dashboard/tasks/new" },
    { label: "Leaderboard", href: "/leaderboard" },
    { label: "Admin", href: "/admin" },
  ]

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link href="/" className="text-2xl font-bold text-primary">TaskFlow</Link>
      <div className="hidden md:flex gap-4 items-center">
        {user ? (
          <>
            {navItems.map((item) => (
               <Button variant="ghost" asChild key={item.href}>
                  <Link 
                    href={item.href} 
                    className={cn("transition hover:text-primary", pathname === item.href ? "text-primary font-semibold" : "")}
                  >
                    {item.label}
                  </Link>
                </Button>
            ))}
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
