"use client";

import Link from 'next/link';
import { useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Chrome } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
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
        setIsGoogleLoading(false);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-semibold">Welcome Back</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input id="email" type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full" />
            <Input id="password" type="password" required value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="w-full" />
            <Button type="submit" className="w-full font-medium" disabled={isLoading || isGoogleLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Login
            </Button>
          </form>
          <Separator className="my-6" />
           <Button variant="outline" className="w-full font-medium" onClick={handleGoogleSignIn} type="button" disabled={isLoading || isGoogleLoading}>
              {isGoogleLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Chrome className="mr-2" /> }
              Continue with Google
            </Button>
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground justify-center">
            <p>Don't have an account? <Link href="/signup" className="text-primary hover:underline font-medium">Sign up</Link></p>
        </CardFooter>
      </Card>
    </div>
  );
}
