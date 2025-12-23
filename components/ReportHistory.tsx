// components/ReportHistory.tsx
'use client';

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface Report {
  id: string;
  date: string;
  sales: string;
  calls: number;
  meetings: number;
  notes: string;
  status: "submitted" | "reviewed";
}

export default function ReportHistory({ employeeId }: { employeeId: string }) {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch(`/api/kpi-log?employeeId=${employeeId}&type=daily_report`);
        const data = await res.json();
        setReports(data.reports || []);
      } catch (err) {
        console.error("خطا در دریافت تاریخچه");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [employeeId]);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (reports.length === 0) {
    return <p className="text-center text-muted-foreground py-8">هنوز گزارشی ارسال نشده است.</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>گزارش‌های ارسالی</CardTitle>
        <CardDescription>لیست گزارش‌های روزانه شما در ماه جاری</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>تاریخ</TableHead>
              <TableHead>فروش</TableHead>
              <TableHead>تماس</TableHead>
              <TableHead>جلسه</TableHead>
              <TableHead>وضعیت</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.date}</TableCell>
                <TableCell>{report.sales}</TableCell>
                <TableCell>{report.calls}</TableCell>
                <TableCell>{report.meetings}</TableCell>
                <TableCell>
                  <Badge variant={report.status === "reviewed" ? "secondary" : "default"}>
                    {report.status === "reviewed" ? "بررسی‌شده" : "ارسالی"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}