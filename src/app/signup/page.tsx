import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Logo from '@/components/logo';

export default function SignupPage() {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="hidden bg-muted lg:block">
        <Image
          src="https://picsum.photos/seed/2/1200/900"
          data-ai-hint="workspace desk"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <Logo className="w-32 mx-auto" />
            <h1 className="text-3xl font-bold font-headline mt-4">Create an account</h1>
            <p className="text-balance text-muted-foreground">
              Enter your information to get started
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Max Robinson" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full" asChild>
              <Link href="/dashboard">Create an account</Link>
            </Button>
            <Button variant="outline" className="w-full">
              Sign up with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/" className="underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
