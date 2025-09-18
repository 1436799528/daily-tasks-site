"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useState } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";

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
      toast({ title: "Success!", description: "Your task has been submitted for approval." });
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
       <Navbar />
      <div className="container max-w-2xl py-10">
        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Post a New Task</CardTitle>
            <CardDescription>Fill in the details below to get your task completed by the community.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="title">Task Title</label>
                <Input id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g., Design a new logo" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="description">Task Description</label>
                <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} placeholder="Provide a detailed description of the task..." required />
              </div>
              <div className="space-y-2">
                <label htmlFor="reward">Reward ($)</label>
                <Input id="reward" value={reward} onChange={e => setReward(e.target.value)} placeholder="e.g., 100" type="number" required min="1" />
              </div>
              <Button type="submit" className="w-full font-medium text-lg py-6" disabled={isSubmitting || loading}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit for Approval
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
