"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import TaskCard from "@/components/TaskCard";
import type { Task } from "@/lib/data";

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      if (typeof window === "undefined" || !db) {
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const q = query(collection(db, "tasks"), where("status", "==", "approved"));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          console.log("No approved tasks found.");
          setTasks([]);
        } else {
          const fetchedTasks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Task[];
          setTasks(fetchedTasks);
        }
      } catch (err) {
        console.error("Error fetching tasks: ", err);
        const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
        setError(`Failed to load tasks: ${errorMessage}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, []);

  return (
    <ProtectedRoute>
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6 text-foreground">Available Tasks</h1>
        {isLoading && <p>Loading tasks...</p>}
        {error && <p className="text-destructive">{error}</p>}
        {!isLoading && !error && tasks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map(task => <TaskCard key={task.id} task={task} />)}
          </div>
        ) : (
          !isLoading && !error && (
            <div className="text-center py-10 bg-white rounded-xl shadow-md">
              <h2 className="text-xl font-medium">No tasks available right now.</h2>
              <p className="text-muted-foreground mt-2">Check back later for new opportunities!</p>
            </div>
          )
        )}
      </div>
    </ProtectedRoute>
  );
}
