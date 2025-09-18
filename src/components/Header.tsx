"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import type { User } from "@/lib/data";
import { Bell } from "lucide-react";
import { Button } from "./ui/button";

export default function Header() {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data() as User);
        }
      }
    };
    fetchUserData();
  }, [user]);

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <Avatar>
            <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || "User"} />
            <AvatarFallback>{user?.displayName ? user.displayName.charAt(0) : "U"}</AvatarFallback>
        </Avatar>
        <div>
            <h2 className="text-lg font-semibold text-foreground">Hello, {user?.displayName || "User"}</h2>
            <p className="text-muted-foreground text-sm">Balance: <span className="text-secondary font-bold">${userData?.totalEarnings?.toLocaleString() || 0}</span></p>
        </div>
      </div>
      <Button variant="ghost" size="icon">
        <Bell className="h-6 w-6 text-muted-foreground" />
      </Button>
    </header>
  );
}
