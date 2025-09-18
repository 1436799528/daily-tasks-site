"use client";

import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import type { Task } from "@/lib/data";

export default function TaskCard({ task }: { task: Task }) {
  return (
    <Card className="flex flex-col hover:shadow-lg transition">
        {task.isRecommended && <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-white">Recommended</Badge>}
        <CardHeader>
            <CardTitle className="font-bold text-lg">{task.title}</CardTitle>
            <CardDescription className="text-sm h-10 overflow-hidden">{task.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
            <div className="flex justify-between items-center">
                <div className="text-lg font-bold text-green-600">${task.reward}</div>
            </div>
        </CardContent>
        <div className="p-6 pt-0">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              View & Start
            </Button>
        </div>
    </Card>
  );
}
