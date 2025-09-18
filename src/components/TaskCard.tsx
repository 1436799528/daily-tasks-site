"use client";

import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import type { Task } from "@/lib/data";
import { DollarSign, Check } from "lucide-react";

export default function TaskCard({ task }: { task: Task }) {
  return (
    <Card className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition">
      <div>
        <div className="flex justify-between items-center mb-2">
            <CardTitle className="text-lg font-semibold text-foreground">{task.title}</CardTitle>
            {task.isRecommended && <Badge variant="secondary" className="text-yellow-600 border-yellow-300 bg-yellow-50">Recommended</Badge>}
        </div>
        <CardDescription className="text-muted-foreground mt-2">{task.description}</CardDescription>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-accent-foreground font-bold flex items-center text-lg"><DollarSign className="h-5 w-5 mr-1 text-accent"/>{task.reward}</span>
        <Button className="font-medium">
          <Check className="mr-2 h-4 w-4"/>
          Claim Task
        </Button>
      </div>
    </Card>
  );
}
