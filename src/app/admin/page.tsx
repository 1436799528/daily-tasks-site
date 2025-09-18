"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, updateDoc, doc, query, orderBy } from "firebase/firestore";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Task } from "@/lib/data";
import { Loader2 } from "lucide-react";

export default function Admin() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTasks = async () => {
    setIsLoading(true);
    const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    setTasks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Task[]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleUpdate = async (id: string, updates: Partial<Task>) => {
    const taskRef = doc(db, "tasks", id);
    await updateDoc(taskRef, updates);
    setTasks(tasks.map(t => t.id === id ? { ...t, ...updates } as Task : t));
  };
  
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'approved': return 'secondary';
      case 'pending': return 'default';
      case 'rejected': return 'destructive';
      default: return 'outline';
    }
  }

  return (
    <ProtectedRoute>
      <Navbar />
      <div className="container max-w-5xl mx-auto py-10">
        <div className="text-left mb-8">
            <h1 className="text-3xl font-bold font-headline">Admin Panel</h1>
            <p className="text-muted-foreground mt-2">Approve, reject, and manage all user-submitted tasks.</p>
        </div>
         {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
        <div className="space-y-4">
          {tasks.map(task => (
            <Card key={task.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-xl">
              <div className="flex-grow">
                <h2 className="font-semibold text-lg text-card-foreground">{task.title}</h2>
                <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                <div className="flex items-center gap-4 mt-2">
                    <span className="font-bold text-accent-foreground">${task.reward}</span>
                    <Badge variant={getStatusVariant(task.status)}>{task.status}</Badge>
                </div>
              </div>
              <div className="flex flex-row sm:flex-col gap-2 mt-4 sm:mt-0 sm:ml-4 flex-shrink-0">
                {task.status === "pending" && (
                  <>
                    <Button size="sm" variant="secondary" onClick={() => handleUpdate(task.id, { status: "approved" })}>
                      Approve
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleUpdate(task.id, { status: "rejected" })}>
                      Reject
                    </Button>
                  </>
                )}
                <Button size="sm" variant={task.recommended ? "default" : "outline"} onClick={() => handleUpdate(task.id, { recommended: !task.recommended })}>
                  {task.recommended ? "Unrecommend" : "Recommend"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
