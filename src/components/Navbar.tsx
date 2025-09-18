import Link from "next/link";
import { auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Logo from "./logo";
import { Button } from "./ui/button";

export default function Navbar() {
  const [user] = useAuthState(auth);

  return (
    <nav className="bg-card text-card-foreground p-4 flex justify-between items-center border-b">
      <Logo />
      <div className="space-x-4 flex items-center">
        {user ? (
          <>
            <Button variant="ghost" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/dashboard/tasks/new">Post Task</Link>
            </Button>
            <Button variant="outline" onClick={() => auth.signOut()}>Logout</Button>
          </>
        ) : (
          <>
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
