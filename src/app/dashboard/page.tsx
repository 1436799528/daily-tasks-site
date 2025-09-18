"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import TaskCard from "@/components/TaskCard";
import type { Task } from "@/lib/data";

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const q = query(collection(db, "tasks"), where("status", "==", "approved"));
        const querySnapshot = await getDocs(q);
        const fetchedTasks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Task[];
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks: ", error);
        // Here you could set an error state and display a message to the user
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, []);

  return (
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold font-headline">Available Tasks</h1>
          <p className="text-muted-foreground mt-1">Browse tasks and start earning today.</p>
        </div>
        
        {isLoading ? (
          <p>Loading tasks...</p>
        ) : tasks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tasks.map(task => <TaskCard key={task.id} task={task} />)}
          </div>
        ) : (
          <p>No tasks available at the moment. Check back later!</p>
        )}
      </div>
  );
}
