"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useState } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function PostTask() {
  const [user, loading] = useAuthState(auth);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reward, setReward] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({ title: "Error", description: "You must be logged in to post a task.", variant: "destructive" });
      return;
    }
    if (!title || !description || !reward) {
      toast({ title: "Error", description: "Please fill out all fields.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "tasks"), {
        title,
        description,
        reward: Number(reward),
        postedBy: user.uid,
        status: "pending",
        recommended: false,
        createdAt: serverTimestamp()
      });
      toast({ title: "Success!", description: "Task submitted for approval!" });
      setTitle("");
      setDescription("");
      setReward("");
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
      toast({ title: "Error submitting task", description: errorMessage, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
       <div className="max-w-md mx-auto mt-10 bg-card p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">Post a Task</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Task Title" className="border p-2 w-full rounded" required />
          <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Task Description" className="border p-2 w-full rounded" required />
          <Input value={reward} onChange={e => setReward(e.target.value)} placeholder="Reward ($)" type="number" min="1" className="border p-2 w-full rounded" required />
          <Button type="submit" className="font-medium w-full" disabled={isSubmitting || loading}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Task
          </Button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
