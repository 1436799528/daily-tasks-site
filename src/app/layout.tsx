import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/components/AuthProvider';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'TaskFlow',
  description: 'A lean, professional micro-task platform.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', inter.variable)}>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
