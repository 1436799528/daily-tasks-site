"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import TaskCard from "@/components/TaskCard";
import type { Task } from "@/lib/data";

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const q = query(collection(db, "tasks"), where("status", "==", "approved"));
        const querySnapshot = await getDocs(q);
        const fetchedTasks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Task[];
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks: ", error);
        // Here you could set an error state and display a message to the user
      }
    };
    fetchTasks();
  }, []);

  return (
      <div>
        <h1 className="text-3xl font-headline mb-6">Available Tasks</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tasks.map(task => <TaskCard key={task.id} task={task} />)}
        </div>
      </div>
  );
}
