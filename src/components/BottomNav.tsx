"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ClipboardList, Trophy, UserCircle, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BottomNav() {
  const pathname = usePathname();
  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: Home },
    { label: "Post Task", href: "/dashboard/tasks/new", icon: PlusCircle },
    { label: "Leaderboard", href: "/leaderboard", icon: Trophy },
    { label: "Profile", href: "/dashboard/profile", icon: UserCircle },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-1px_3px_rgba(0,0,0,0.1)] flex justify-around p-2 md:hidden z-50">
      {navItems.map(item => (
        <Link key={item.href} href={item.href} className={cn(
            "flex flex-col items-center gap-1 text-xs font-medium w-1/4 pt-1",
            pathname === item.href ? "text-primary" : "text-muted-foreground"
        )}>
          <item.icon className="h-5 w-5" />
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  );
}
