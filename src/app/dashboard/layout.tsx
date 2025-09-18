import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen w-full bg-background">
        <Navbar />
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
