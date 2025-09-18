import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";

export default function AdminPage() {
  // In a real app, you'd have more robust role-based access control.
  // This is a placeholder for the admin panel.
  return (
    <ProtectedRoute>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-headline mb-6">Admin Panel</h1>
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Pending Tasks</h2>
          <p className="text-muted-foreground">
            Admin content for approving/rejecting tasks will go here.
          </p>
        </div>
      </div>
    </ProtectedRoute>
  );
}
