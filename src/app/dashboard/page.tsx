import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { tasks, currentUser, outstandingUsers } from "@/lib/data"
import { Activity, Award, CheckCircle, DollarSign, Users as UsersIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function Dashboard() {
  const availableTasks = tasks.filter(task => task.status === 'Available' || task.status === 'In Progress');
  const completedTasks = tasks.filter(task => task.status === 'Completed');

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold font-headline md:text-3xl">
          Welcome back, {currentUser.name.split(' ')[0]}!
        </h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Earnings
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${currentUser.totalEarnings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tasks Completed
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{currentUser.tasksCompleted}</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Tasks</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableTasks.length}</div>
            <p className="text-xs text-muted-foreground">
              {tasks.filter(t => t.isRecommended).length} recommended
            </p>
          </CardContent>
        </Card>
        <Card className="bg-accent/30 border-accent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding Users</CardTitle>
            <Award className="h-4 w-4 text-accent-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{outstandingUsers[0].name}</div>
            <p className="text-xs text-accent-foreground/80">
              Top user of the month
            </p>
          </CardContent>
        </Card>
      </div>
      <div>
        <Tabs defaultValue="available">
          <TabsList>
            <TabsTrigger value="available">Available Tasks</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="available" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {availableTasks.map(task => (
                <Card key={task.id} className={`flex flex-col ${task.isRecommended ? 'border-accent shadow-lg' : ''}`}>
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
              ))}
            </div>
          </TabsContent>
          <TabsContent value="completed">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {completedTasks.map(task => (
                <Card key={task.id} className="opacity-70">
                  <CardHeader>
                    <CardTitle className="font-headline">{task.title}</CardTitle>
                    <CardDescription>{task.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                  <div className="flex justify-between items-center">
                      <div className="text-lg font-bold text-primary">${task.reward}</div>
                      <Badge variant="outline">Completed</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
