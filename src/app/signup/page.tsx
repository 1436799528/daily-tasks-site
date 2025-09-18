"use client";

import Link from 'next/link';
import { useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Chrome } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // You might want to also save the user's name to Firestore here
      router.push('/dashboard');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
      toast({
        title: "Sign Up Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
        router.push('/dashboard');
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
        toast({
            title: "Google Sign-In Failed",
            description: errorMessage,
            variant: "destructive",
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
     <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-semibold">Create an Account</CardTitle>
          <CardDescription>Join our community and start earning today.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-4">
            <Input id="name" placeholder="Full Name" required value={name} onChange={(e) => setName(e.target.value)} className="border p-2 w-full rounded" />
            <Input id="email" type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full rounded" />
            <Input id="password" type="password" required value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full rounded" />
            <Button type="submit" className="w-full font-medium" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign Up
            </Button>
          </form>
          <Separator className="my-6" />
           <Button variant="outline" className="w-full font-medium" onClick={handleGoogleSignIn} type="button" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Chrome className="mr-2" /> }
              Continue with Google
            </Button>
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground justify-center mt-4">
            <p>Already have an account? <Link href="/login" className="text-primary hover:underline font-medium">Log in</Link></p>
        </CardFooter>
      </Card>
    </div>
  );
}
