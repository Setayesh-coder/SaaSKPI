// components/DailyReportForm.tsx
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";  // فقط این یکی کافیه
import { Loader2, Send } from "lucide-react";

interface DailyReport {
  sales: string;
  calls: number;
  meetings: number;
  notes: string;
  challenges: string;
}

export default function DailyReportForm({ employeeId }: { employeeId: string }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<DailyReport>({
    sales: "",
    calls: 0,
    meetings: 0,
    notes: "",
    challenges: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // اختیاری: toast loading قشنگ‌تر
    const loadingToast = toast.loading("در حال ارسال گزارش...");

    try {
      const res = await fetch("/api/kpi-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeId,
          date: new Date().toISOString().split("T")[0],
          type: "daily_report",
          data: formData,
        }),
      });

      if (res.ok) {
        toast.dismiss(loadingToast);
        toast.success("گزارش با موفقیت ارسال شد ✅", {
          description: "مدیر شما به‌زودی آن را بررسی خواهد کرد.",
        });

        // ریست فرم
        setFormData({
          sales: "",
          calls: 0,
          meetings: 0,
          notes: "",
          challenges: "",
        });
      } else {
        throw new Error("خطا در ارسال");
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("خطا در ارسال گزارش", {
        description: "لطفاً دوباره تلاش کنید.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="sales">فروش امروز (به تومان)</Label>
            <Input
              id="sales"
              type="text"
              placeholder="مثلاً ۳۴۵۰۰۰۰"
              value={formData.sales}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, sales: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="calls">تعداد تماس موفق</Label>
            <Input
              id="calls"
              type="number"
              min="0"
              value={formData.calls}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, calls: Number(e.target.value) })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="meetings">تعداد جلسات</Label>
            <Input
              id="meetings"
              type="number"
              min="0"
              value={formData.meetings}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, meetings: Number(e.target.value) })
              }
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="notes">نکات مثبت و دستاوردها</Label>
          <Textarea
            id="notes"
            placeholder="امروز چه کارهای خوبی انجام دادید؟"
            rows={4}
            value={formData.notes}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            required
          />
        </div>

        <div>
          <Label htmlFor="challenges">چالش‌ها و مشکلات</Label>
          <Textarea
            id="challenges"
            placeholder="با چه مشکلاتی روبرو شدید؟"
            rows={3}
            value={formData.challenges}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setFormData({ ...formData, challenges: e.target.value })
            }
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={loading} size="lg" className="gap-2">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                در حال ارسال...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                ارسال گزارش
              </>
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
}