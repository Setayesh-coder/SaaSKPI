// //  forms
// //  crud operations
// // api kpi log

// // components/EmployeeDashboard.tsx (Client Component)

// 'use client'

// import DailyReportForm from '@/components/DailyReportForm'
// import ReportHistory from '@/components/ReportHistory'
// import EmployeeDashboard from "@/components/EmployeeDashboard";

// export default function EmployeeDashboardPage({ employeeId }: { employeeId: string } {
//   params,
// }: {
//   params: { id: string };
// }) {
//   return (
//     <EmployeeDashboard employeeId={params.id} />;
//   <div className="space-y-8">
//     <section>
//       <h2 className="text-xl font-semibold mb-4">وظایف امروز</h2>
//       {/* <TaskList employeeId={employeeId} /> */}
//     </section>

//     <section>
//       <h2 className="text-xl font-semibold mb-4">گزارش روزانه</h2>
//       <DailyReportForm employeeId={employeeId} />
//     </section>

//     <section>
//       <h2 className="text-xl font-semibold mb-4">تاریخچه گزارش‌ها</h2>
//       <ReportHistory employeeId={employeeId} />
//     </section>
//   </div>
//   )
// } import EmployeeDashboard from "@/components/EmployeeDashboard";

// export default function EmployeeDashboardPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   return <EmployeeDashboard employeeId={params.id} />;
// }
// components/EmployeeDashboard.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DailyReportForm from '@/components/DailyReportForm';
import ReportHistory from '@/components/ReportHistory';
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Calendar } from "lucide-react";

export default function EmployeeDashboard({ employeeId }: { employeeId: string }) {
  // داده نمونه — بعداً از API بگیر
  const kpis = [
    { title: "فروش امروز", value: "₼ ۳,۴۵۰", change: 18.2, target: "₼ ۴,۰۰۰" },
    { title: "تماس‌های موفق", value: 32, change: -2, target: "۴۰" },
    { title: "وظایف تکمیل‌شده", value: "۸/۱۰", change: 10, target: "۱۰" },
  ];

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-12">
      {/* سلام و KPIها */}
      <div>
        <h1 className="text-3xl font-bold mb-2">سلام، کارمند عزیز!</h1>
        <p className="text-muted-foreground mb-8">
          امروز <span className="font-medium">۲۳ آذر ۱۴۰۴</span> — عملکرد شما در یک نگاه
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {kpis.map((kpi, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                {kpi.change > 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-2">
                  <Badge variant={kpi.change > 0 ? "default" : "destructive"}>
                    {kpi.change > 0 ? "+" : ""}{kpi.change}%
                  </Badge>
                  هدف: {kpi.target}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* وظایف امروز (اختیاری) */}
      {/* {<section>
        <h2 className="text-2xl font-semibold mb-6">وظایف امروز</h2>
        <TaskList employeeId={employeeId} />
      </section>} */}

      {/* گزارش روزانه */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">گزارش روزانه امروز</h2>
        </div>
        <DailyReportForm employeeId={employeeId} />
      </section>

      {/* تاریخچه گزارش‌ها */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">تاریخچه گزارش‌های شما</h2>
        <ReportHistory employeeId={employeeId} />
      </section>
    </div>
  );
}