import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { users } from "@/lib/data";
import { Trophy } from "lucide-react";

export default function LeaderboardPage() {
  const sortedUsers = [...users].sort((a, b) => b.totalEarnings - a.totalEarnings);
  return (
    <ProtectedRoute>
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-headline mb-6 text-center">Leaderboard</h1>
        <div className="space-y-4">
          {sortedUsers.map((user, index) => (
            <Card key={user.id} className="flex items-center p-4">
              <div className="flex items-center gap-4 w-1/4">
                <span className="text-xl font-bold text-muted-foreground w-8 text-center">{index + 1}</span>
                <Avatar>
                  <AvatarImage src={user.avatarUrl} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="font-semibold">{user.name}</span>
              </div>
              <div className="w-1/4 text-center">
                 <p className="text-muted-foreground text-sm">Tasks Completed</p>
                 <p className="font-bold text-lg">{user.tasksCompleted}</p>
              </div>
               <div className="w-1/4 text-center">
                 <p className="text-muted-foreground text-sm">Total Earnings</p>
                 <p className="font-bold text-lg text-primary">${user.totalEarnings.toLocaleString()}</p>
              </div>
              <div className="w-1/4 text-right">
                {index < 3 && <Trophy className={`inline-block h-6 w-6 ${
                    index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : 'text-yellow-700'
                }`} />}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
