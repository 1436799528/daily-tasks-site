"use client";

import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import type { Task } from "@/lib/data";
import { DollarSign } from "lucide-react";

export default function TaskCard({ task }: { task: Task }) {
  return (
    <Card className="flex flex-col hover:shadow-lg transition-shadow duration-300 rounded-xl">
        <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="font-semibold text-lg">{task.title}</CardTitle>
              {task.isRecommended && <Badge variant="secondary" className="bg-accent/20 text-accent-foreground hover:bg-accent/30">Recommended</Badge>}
            </div>
            <CardDescription className="text-sm text-muted-foreground pt-1 h-12 overflow-hidden">{task.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
            <div className="flex items-center text-accent-foreground font-bold text-lg">
                <DollarSign className="h-5 w-5 mr-1 text-accent"/>
                {task.reward}
            </div>
        </CardContent>
        <CardFooter>
            <Button className="w-full">
              Claim Task
            </Button>
        </CardFooter>
    </Card>
  );
}
