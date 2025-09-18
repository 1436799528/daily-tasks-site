"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);


  if (loading || user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <section className="relative w-full h-[70vh] flex items-center justify-center text-center text-white">
           <Image
            src="https://picsum.photos/seed/3/1800/1200"
            alt="Hero background"
            fill
            className="object-cover -z-10 brightness-50"
            data-ai-hint="team productive"
          />
          <div className="p-6">
            <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4">Tasking Platform</h1>
            <p className="text-lg md:text-xl mb-6 max-w-3xl mx-auto">
              Post tasks, complete tasks, and earn rewards.
            </p>
            <Button size="lg" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </section>
      </main>
      <footer className="bg-card text-card-foreground border-t p-6 text-center">
        <p>&copy; 2024 TaskFlow. All rights reserved.</p>
      </footer>
    </div>
  );
}
