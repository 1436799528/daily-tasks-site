"use client"
import ProtectedRoute from "@/components/ProtectedRoute";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 p-4 lg:p-6 mb-16 md:mb-0">
          {children}
        </main>
        <BottomNav />
      </div>
    </ProtectedRoute>
  );
}
