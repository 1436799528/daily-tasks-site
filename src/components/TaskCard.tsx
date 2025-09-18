import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import type { Task } from "@/lib/data";

export default function TaskCard({ task }: { task: Task }) {
  return (
    <Card className="flex flex-col hover:shadow-lg transition">
        {task.isRecommended && <Badge className="absolute -top-2 -right-2 bg-accent text-accent-foreground hover:bg-accent/90">Recommended</Badge>}
        <CardHeader>
            <CardTitle className="font-headline text-lg">{task.title}</CardTitle>
            <CardDescription className="text-sm h-10 overflow-hidden">{task.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
            <div className="flex justify-between items-center">
                <div className="text-lg font-bold text-primary">${task.reward}</div>
                <Badge variant="secondary">{task.category}</Badge>
            </div>
        </CardContent>
        <div className="p-6 pt-0">
            <Button className="w-full">
              {task.status === 'In Progress' ? 'Submit Work' : 'View & Start'}
            </Button>
        </div>
    </Card>
  );
}
