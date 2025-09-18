"use client";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import type { Task } from "@/lib/data";
import { DollarSign, Check, Loader2 } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/lib/firebase";
import { doc, updateDoc, increment } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function TaskCard({ task }: { task: Task }) {
  const [user] = useAuthState(auth);
  const { toast } = useToast();
  const [isClaiming, setIsClaiming] = useState(false);

  const handleClaimTask = async () => {
    if (!user) {
      toast({ title: "Error", description: "You must be logged in to claim a task.", variant: "destructive" });
      return;
    }
    setIsClaiming(true);
    try {
      const taskRef = doc(db, "tasks", task.id);
      await updateDoc(taskRef, { status: "completed", completedBy: user.uid });

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        totalEarnings: increment(task.reward),
        tasksCompleted: increment(1)
        // weeklyEarnings and monthlyEarnings would be updated by a scheduled function
      });
      
      toast({ title: "Success!", description: "Task claimed successfully!" });

    } catch (error) {
      console.error("Error claiming task:", error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
      toast({ title: "Error", description: `Failed to claim task: ${errorMessage}`, variant: "destructive" });
    } finally {
        setIsClaiming(false);
    }
  };


  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between hover:shadow-xl transition duration-200">
      <div>
        <div className="flex justify-between items-start mb-2">
            <h2 className="text-xl font-semibold text-foreground">{task.title}</h2>
            {task.isRecommended && 
                <Badge variant="secondary" className="bg-accent text-accent-foreground border-yellow-300">Recommended</Badge>
            }
        </div>
        <p className="text-muted-foreground mt-2">{task.description}</p>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-secondary font-bold flex items-center text-lg"><DollarSign className="h-5 w-5 mr-1"/>{task.reward}</span>
        <Button 
            className="font-medium" 
            onClick={handleClaimTask} 
            disabled={isClaiming || task.status === 'completed'}>
          {isClaiming ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4"/>}
          {task.status === 'completed' ? 'Completed' : 'Claim Task'}
        </Button>
      </div>
    </div>
  );
}
