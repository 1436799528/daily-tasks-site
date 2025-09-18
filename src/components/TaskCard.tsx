"use client";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import type { Task } from "@/lib/data";
import { DollarSign, Check } from "lucide-react";

export default function TaskCard({ task }: { task: Task }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between hover:shadow-xl transition duration-200">
      <div>
        <div className="flex justify-between items-start mb-2">
            <h2 className="text-xl font-semibold text-foreground">{task.title}</h2>
            {task.recommended && 
                <Badge variant="secondary" className="bg-accent text-accent-foreground border-yellow-300">Recommended</Badge>
            }
        </div>
        <p className="text-muted-foreground mt-2">{task.description}</p>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-secondary font-bold flex items-center text-lg"><DollarSign className="h-5 w-5 mr-1"/>{task.reward}</span>
        <Button className="font-medium">
          <Check className="mr-2 h-4 w-4"/>
          Claim Task
        </Button>
      </div>
    </div>
  );
}
