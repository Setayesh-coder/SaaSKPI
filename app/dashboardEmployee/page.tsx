// app/dashboardEmployee/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EmployeeList() {
    // داده نمونه — بعداً از دیتابیس بگیر
    const employees = [
        { id: "1", name: "علی احمدی", role: "فروشنده" },
        { id: "2", name: "زهرا رضایی", role: "پشتیبانی" },
        { id: "3", name: "محمد حسینی", role: "مدیر پروژه" },
    ];

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">لیست کارمندان</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {employees.map((emp) => (
                    <Card key={emp.id}>
                        <CardHeader>
                            <CardTitle>{emp.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{emp.role}</p>
                        </CardHeader>
                        <CardContent>
                            <Link href={`/dashboardEmployee/${emp.id}`}>
                                <Button className="w-full">مشاهده داشبورد</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}