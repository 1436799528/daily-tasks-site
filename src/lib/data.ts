import { Award, CheckCircle, FileText, User as UserIcon, XCircle } from "lucide-react"

export type Task = {
  id: string
  title: string
  description: string
  reward: number
  status: 'approved' | 'pending' | 'completed' | 'in-progress' | 'rejected'
  postedBy?: string
  completedBy?: string
  createdAt?: any
  isRecommended?: boolean
}

export const tasks: Task[] = [
  { id: 'TASK-8782', title: 'Create a logo for a new startup', description: 'Design a modern and minimalist logo for a tech startup.', reward: 150, status: 'approved', isRecommended: true },
  { id: 'TASK-7878', title: 'Write a blog post about AI', description: 'A 1000-word article on the future of Artificial Intelligence.', reward: 75, status: 'approved', },
  { id: 'TASK-4582', title: 'Develop a simple landing page', description: 'Code a responsive landing page using HTML/CSS and JavaScript.', reward: 250, status: 'approved', },
  { id: 'TASK-1290', title: 'Transcribe a 10-minute audio file', description: 'Accurately transcribe an interview recording.', reward: 20, status: 'approved', },
  { id: 'TASK-3132', title: 'Create social media content', description: 'Generate 5 posts for an Instagram campaign.', reward: 50, status: 'completed', },
  { id: 'TASK-5555', title: 'Debug a React component', description: 'Find and fix a bug in a given React component.', reward: 100, status: 'in-progress', },
  { id: 'TASK-6811', title: 'Proofread a document', description: 'Check a 5-page document for grammatical errors.', reward: 30, status: 'completed', },
  { id: 'TASK-9876', title: 'Design a banner for a website', description: 'Create a visually appealing banner for a homepage.', reward: 60, status: 'approved', isRecommended: true },
]

export type User = {
  id: string
  name: string
  avatarUrl: string
  email: string
  tasksCompleted: number
  totalEarnings: number;
  weeklyEarnings?: number;
  monthlyEarnings?: number;
  weeklyTop?: boolean;
  monthlyTop?: boolean;
}

export const users: User[] = [
  { id: 'USR-001', name: 'Alex Johnson', avatarUrl: 'https://i.pravatar.cc/40?u=usr-001', email: 'alex@example.com', tasksCompleted: 12, totalEarnings: 1250 },
  { id: 'USR-002', name: 'Maria Garcia', avatarUrl: 'https://i.pravatar.cc/40?u=usr-002', email: 'maria@example.com', tasksCompleted: 8, totalEarnings: 820 },
  { id: 'USR-003', name: 'David Smith', avatarUrl: 'https://i.pravatar.cc/40?u=usr-003', email: 'david@example.com', tasksCompleted: 21, totalEarnings: 2300, monthlyTop: true },
  { id: 'USR-004', name: 'Sarah Chen', avatarUrl: 'https://i.pravatar.cc/40?u=usr-004', email: 'sarah@example.com', tasksCompleted: 15, totalEarnings: 1800, weeklyTop: true },
  { id: 'USR-005', name: 'Michael Brown', avatarUrl: 'https://i.pravatar.cc/40?u=usr-005', email: 'michael@example.com', tasksCompleted: 5, totalEarnings: 450 },

]

export const outstandingUsers = [
  { ...users[2], rank: 1, period: 'Monthly' },
  { ...users[0], rank: 2, period: 'Weekly' },
]

export type Earning = {
  id: string
  taskId: string
  taskTitle: string
  amount: number
  date: string
}

export const earnings: Earning[] = [
  { id: 'ERN-001', taskId: 'TASK-3132', taskTitle: 'Create social media content', amount: 50, date: '2023-10-26' },
  { id: 'ERN-002', taskId: 'TASK-6811', taskTitle: 'Proofread a document', amount: 30, date: '2023-10-24' },
]

export type Notification = {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  date: string;
}

export const notifications: Notification[] = [
    {
        id: '1',
        icon: Award,
        title: 'You are the Outstanding User of the Week!',
        description: 'Congratulations! You have been awarded for your exceptional performance.',
        date: '2 days ago',
    },
    {
        id: '2',
        icon: CheckCircle,
        title: 'Task "TASK-3132" approved',
        description: 'Your submission for "Create social media content" has been approved.',
        date: '3 days ago',
    },
    {
        id: '3',
        icon: XCircle,
        title: 'Task "TASK-4444" rejected',
        description: 'Your submission for "Design a new icon set" was not approved.',
        date: '4 days ago',
    },
    {
        id: '4',
        icon: UserIcon,
        title: 'New user "Jane Doe" joined',
        description: 'Welcome our new community member!',
        date: '5 days ago',
    },
    {
        id: '5',
        icon: FileText,
        title: 'New recommended task available',
        description: 'A new high-priority task has been posted.',
        date: '6 days ago',
    },
]

export const currentUser = users[0];
