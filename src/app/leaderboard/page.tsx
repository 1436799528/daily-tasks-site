"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@/lib/data";
import { Crown, Trophy, Medal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Leaderboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopUsers = async () => {
        if (typeof window === "undefined") {
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const q = query(collection(db, "users"), orderBy("totalEarnings", "desc"), limit(10));
            const snapshot = await getDocs(q);
            if (snapshot.empty) {
                console.log("No users found.");
                setUsers([]);
            } else {
                const fetchedUsers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as User[];
                setUsers(fetchedUsers);
            }
        } catch (err) {
            console.error("Error fetching top users:", err);
            const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
            setError(`Failed to load leaderboard: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    };
    fetchTopUsers();
  }, []);

  const getTrophy = (index: number) => {
    if (index === 0) return <Crown className="h-6 w-6 text-yellow-500" />;
    if (index === 1) return <Trophy className="h-6 w-6 text-slate-400" />;
    if (index === 2) return <Medal className="h-6 w-6 text-orange-400" />;
    return <span className="font-bold text-muted-foreground">{index + 1}.</span>;
  };


  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-foreground">Top Taskers</h1>
        {isLoading && <p className="text-center">Loading leaderboard...</p>}
        {error && <p className="text-center text-destructive">{error}</p>}
        {!isLoading && !error && (
        <Card className="bg-white rounded-xl shadow-md divide-y">
          {users.length > 0 ? users.map((user, index) => (
            <div key={user.id} className="flex justify-between items-center p-4 hover:bg-gray-50 transition">
              <div className="flex items-center gap-4">
                <div className="w-8 text-center">{getTrophy(index)}</div>
                <Avatar>
                  <AvatarImage src={user.avatarUrl} alt={user.name || "User"} />
                  <AvatarFallback>{user.name ? user.name.charAt(0) : "U"}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                    <span className="text-foreground font-medium">{user.name || "Anonymous User"}</span>
                    <div className="flex gap-2 mt-1 sm:mt-0">
                        {user.weeklyTop && (
                            <Badge variant="default" className="bg-primary text-primary-foreground">Top This Week</Badge>
                        )}
                        {user.monthlyTop && (
                            <Badge variant="secondary" className="bg-accent text-accent-foreground">Top This Month</Badge>
                        )}
                    </div>
                </div>
              </div>
              <span className="font-semibold text-lg text-secondary">${(user.totalEarnings || 0).toLocaleString()}</span>
            </div>
          )) : <p className="text-center p-4">Leaderboard is empty.</p>}
        </Card>
        )}
      </div>
    </ProtectedRoute>
  );
}
