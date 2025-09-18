"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import Navbar from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Crown, Trophy, Medal } from "lucide-react";
import type { User } from "@/lib/data";
import { Loader2 } from "lucide-react";


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
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTopUsers();
  }, []);
  
  const getTrophy = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="h-7 w-7 text-yellow-500" />;
      case 1:
        return <Trophy className="h-6 w-6 text-gray-400" />;
      case 2:
        return <Medal className="h-5 w-5 text-yellow-700" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground w-8 text-center">{index + 1}</span>;
    }
  };


  return (
    <ProtectedRoute>
      <Navbar />
      <div className="container max-w-4xl mx-auto py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-headline">Top Taskers</h1>
          <p className="text-muted-foreground mt-2">See who's leading the pack in our community.</p>
        </div>
        {isLoading ? (
           <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
        <div className="space-y-4">
          {users.map((user, index) => (
            <Card key={user.id} className="flex items-center p-4 transition-all hover:shadow-md rounded-xl">
              <div className="flex items-center gap-4 w-1/6">
                 <div className="w-8 text-center">{getTrophy(index)}</div>
              </div>
              <div className="flex items-center gap-4 flex-grow">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user.avatarUrl} alt={user.name || "User Avatar"} />
                  <AvatarFallback>{user.name ? user.name.charAt(0) : 'U'}</AvatarFallback>
                </Avatar>
                <div>
                  <span className="font-semibold text-md">{user.name || "Anonymous User"}</span>
                   <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="w-1/4 text-center">
                 <p className="text-muted-foreground text-sm">Tasks Completed</p>
                 <p className="font-bold text-lg">{user.tasksCompleted || 0}</p>
              </div>
               <div className="w-1/4 text-center">
                 <p className="text-muted-foreground text-sm">Total Earnings</p>
                 <p className="font-bold text-lg text-accent-foreground">${(user.totalEarnings || 0).toLocaleString()}</p>
              </div>
            </Card>
          ))}
        </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
