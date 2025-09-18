"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@/lib/data";
import { Crown, Trophy, Medal } from "lucide-react";


export default function Leaderboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopUsers = async () => {
        setIsLoading(true);
        try {
            const q = query(collection(db, "users"), orderBy("totalEarnings", "desc"), limit(10));
            const snapshot = await getDocs(q);
            const fetchedUsers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as User[];
            setUsers(fetchedUsers);
        } catch (error) {
            console.error("Error fetching top users:", error);
        } finally {
            setIsLoading(false);
        }
    };
    fetchTopUsers();
  }, []);

  const getTrophy = (index: number) => {
    if (index === 0) return <Crown className="h-6 w-6 text-yellow-500" />;
    if (index === 1) return <Trophy className="h-6 w-6 text-gray-400" />;
    if (index === 2) return <Medal className="h-6 w-6 text-yellow-700" />;
    return <span className="font-bold text-gray-700">{index + 1}.</span>;
  };


  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-6 text-center">Top Taskers</h1>
        {isLoading ? <p className="text-center">Loading leaderboard...</p> : (
        <Card className="bg-white rounded-xl shadow divide-y">
          {users.map((user, index) => (
            <div key={user.id} className="flex justify-between items-center p-4 hover:bg-gray-50 transition">
              <div className="flex items-center gap-4">
                <div className="w-8 text-center">{getTrophy(index)}</div>
                <Avatar>
                  <AvatarImage src={user.avatarUrl} alt={user.name || "User"} />
                  <AvatarFallback>{user.name ? user.name.charAt(0) : "U"}</AvatarFallback>
                </Avatar>
                <span className="text-gray-900 font-medium">{user.name || "Anonymous User"}</span>
              </div>
              <span className="font-semibold text-lg text-green-600">${(user.totalEarnings || 0).toLocaleString()}</span>
            </div>
          ))}
        </Card>
        )}
      </div>
    </ProtectedRoute>
  );
}
