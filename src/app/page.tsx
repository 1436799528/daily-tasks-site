"use client";

import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <h1 className="text-5xl font-bold text-foreground mb-4">Welcome to TaskFlow</h1>
      <p className="text-muted-foreground text-lg mb-6 max-w-xl">
        Complete tasks, earn rewards, and grow your earnings. TaskFlow is simple, friendly, and fully responsive.
      </p>
      <Button asChild size="lg" className="text-lg font-medium">
        <Link href="/signup">Get Started</Link>
      </Button>
    </div>
  );
}
