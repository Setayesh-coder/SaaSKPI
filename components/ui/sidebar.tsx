// components/manager/SidebarNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Home,
  Users,
  BarChart3,
  LogOut
} from "lucide-react";

const navItems = [
  { title: "داشبورد اصلی", href: "/dashboardManager", icon: Home },
  { title: "مدیریت کارمندان", href: "/dashboardManager/employeeManager", icon: Users },
  { title: "گزارش‌های کلی", href: "/dashboardManager/employeeManager/reports", icon: BarChart3 },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-l bg-card shadow-lg flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-primary">KPI Tracker</h1>
        <p className="text-sm text-muted-foreground">پنل مدیریت</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant={pathname.startsWith(item.href) ? "secondary" : "ghost"}
              className="w-full justify-start gap-3"
            >
              <item.icon className="h-5 w-5" />
              {item.title}
            </Button>
          </Link>
        ))}
      </nav>

      <div className="p-6 border-t">
        <div className="flex items-center gap-3 mb-4">
          <Avatar>
            <AvatarFallback>M</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">مدیر سیستم</p>
            <p className="text-xs text-muted-foreground">admin@kpi.com</p>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full gap-2"
          onClick={() => {
            // بعداً اینجا logout با Supabase اضافه می‌کنیم
            window.location.href = '/login'
          }}
        >
          <LogOut className="h-4 w-4" />
          خروج از حساب
        </Button>
      </div>
    </div>
  );
}