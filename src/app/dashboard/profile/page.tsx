import ProtectedRoute from "@/components/ProtectedRoute";

export default function ProfilePage() {
    return (
        <ProtectedRoute>
            <div>
                <h1 className="text-2xl font-semibold font-headline">Profile</h1>
                <p>This is the user profile page. Content to be added.</p>
            </div>
        </ProtectedRoute>
    )
}
