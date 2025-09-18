import Link from "next/link"
import {
  CircleUser,
  MoreHorizontal,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { currentUser, earnings } from "@/lib/data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfilePage() {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  }

  return (
    <div className="flex flex-col gap-6">
       <div className="flex items-center">
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold font-headline tracking-tight sm:grow-0">
          My Profile
        </h1>
        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Button variant="outline" size="sm">
            Discard
          </Button>
          <Button size="sm">Save Changes</Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>User Details</CardTitle>
              <CardDescription>
                Your personal information and account details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <span className="font-semibold">{currentUser.name}</span>
                  <span className="text-sm text-muted-foreground">{currentUser.email}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Earnings History</CardTitle>
              <CardDescription>
                A record of all your completed tasks and earnings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Date
                    </TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {earnings.map((earning) => (
                    <TableRow key={earning.id}>
                      <TableCell>
                        <div className="font-medium">{earning.taskTitle}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {earning.taskId}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {earning.date}
                      </TableCell>
                      <TableCell className="text-right">${earning.amount.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-2</strong> of <strong>{earnings.length}</strong> earnings
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <Avatar className="h-32 w-32 mx-auto border-4 border-primary/50">
                  <AvatarImage src={currentUser.avatarUrl} alt={`@${currentUser.name}`} className="object-cover" />
                  <AvatarFallback className="text-4xl">{getInitials(currentUser.name)}</AvatarFallback>
                </Avatar>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <Button variant="outline">Change</Button>
                  <Button variant="ghost">Remove</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Your Rewards</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
               <div className="flex items-center gap-4">
                <Badge className="text-3xl p-2 bg-accent text-accent-foreground">🏅</Badge>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Top User of the Month
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Awarded on 2023-10-01
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge className="text-3xl p-2 bg-secondary text-secondary-foreground">🥈</Badge>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Weekly Top Performer
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Awarded on 2023-09-25
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
