"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, updateDoc, doc, query, orderBy } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Task } from "@/lib/data";

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
  };

  return (
    <ProtectedRoute>
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-6">Admin Panel</h1>
        {isLoading ? <p>Loading tasks...</p> : (
        <div className="grid grid-cols-1 gap-4">
          {tasks.map(task => (
            <Card key={task.id} className="bg-white p-4 rounded-xl shadow flex flex-col sm:flex-row justify-between sm:items-center">
              <div className="flex-grow">
                <h2 className="font-semibold text-foreground">{task.title}</h2>
                <p className="text-muted-foreground text-sm">{task.description}</p>
                <div className="flex items-center gap-2 mt-2">
                    <span className="font-bold text-accent-foreground">${task.reward}</span>
                    <Badge variant={getStatusVariant(task.status)}>{task.status}</Badge>
                </div>
              </div>
              <div className="flex flex-row sm:flex-col gap-2 mt-4 sm:mt-0 sm:ml-4 flex-shrink-0">
                {task.status === "pending" && (
                  <>
                    <Button size="sm" variant="secondary" className="bg-green-600 text-white hover:bg-green-700" onClick={() => handleUpdate(task.id, { status: "approved" })}>
                      Approve
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleUpdate(task.id, { status: "rejected" })}>
                      Reject
                    </Button>
                  </>
                )}
                <Button size="sm" variant={task.recommended ? "default" : "outline"} className={`${task.recommended ? 'bg-yellow-500 text-white hover:bg-yellow-600' : 'bg-gray-200'}`} onClick={() => handleUpdate(task.id, { recommended: !task.recommended })}>
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
