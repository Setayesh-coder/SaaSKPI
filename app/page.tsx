import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, Users, DollarSign, Activity, ArrowRight, Check } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 px-6 py-24 md:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            شاخص‌های کلیدی عملکرد خود را به راحتی پیگیری کنید
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-3xl mx-auto">
            KPI Tracker یک داشبورد قدرتمند و ساده است که به شما کمک می‌کند درآمد، کاربران، رشد و تمام معیارهای مهم کسب‌وکارتان را در یک نگاه ببینید و تصمیم‌های داده‌محور بگیرید.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" className="gap-2">
              شروع رایگان <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              مشاهده دمو
            </Button>
          </div>
        </div>
      </section>

      <Separator />

      {/* Features Section */}
      <section className="px-6 py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">چرا KPI Tracker؟</h2>
            <p className="mt-4 text-muted-foreground">همه چیزهایی که برای نظارت بر عملکرد نیاز دارید</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <DollarSign className="h-10 w-10 text-primary mb-4" />
                <CardTitle>پیگیری درآمد لحظه‌ای</CardTitle>
                <CardDescription>
                  فروش، سود و جریان نقدی را در زمان واقعی ببینید
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600" /> مقایسه با دوره‌های قبلی</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600" /> پیش‌بینی هوشمند</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-4" />
                <CardTitle>رشد کاربران</CardTitle>
                <CardDescription>
                  کاربران جدید، فعال و churn را دقیق نظارت کنید
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600" /> قیف تبدیل (Funnel)</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600" /> تحلیل cohort</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Activity className="h-10 w-10 text-primary mb-4" />
                <CardTitle>داشبورد سفارشی</CardTitle>
                <CardDescription>
                  ویجت‌ها را بکشید و رها کنید تا داشبورد دلخواه بسازید
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600" /> چارت‌های متنوع</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600" /> گزارش خودکار</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* KPI Preview Section */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl font-bold mb-12">همه چیز در یک نگاه</h2>
          <div className="bg-card rounded-2xl shadow-2xl p-8 border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">درآمد کل</p>
                <p className="text-3xl font-bold mt-2">$۴۵,۲۳۱</p>
                <Badge variant="default" className="mt-2 bg-green-100 text-green-800">+۲۰.۱%</Badge>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">کاربران جدید</p>
                <p className="text-3xl font-bold mt-2">+۲,۳۵۰</p>
                <Badge variant="default" className="mt-2 bg-green-100 text-green-800">+۱۵%</Badge>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">کاربران فعال</p>
                <p className="text-3xl font-bold mt-2">۱۲,۲۳۴</p>
                <Badge variant="destructive" className="mt-2">-۴%</Badge>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">نرخ رشد</p>
                <p className="text-3xl font-bold mt-2">+۸.۵%</p>
                <Badge variant="default" className="mt-2 bg-green-100 text-green-800">بالاتر از هدف</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="px-6 py-20 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold">همین امروز شروع کنید</h2>
          <p className="mt-4 text-lg opacity-90">
            بدون نیاز به کارت اعتباری — ۱۴ روز آزمایشی رایگان
          </p>
          <Button size="lg" variant="secondary" className="mt-8 gap-2">
            ثبت‌نام رایگان <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-6">
        <div className="mx-auto max-w-7xl text-center text-sm text-muted-foreground">
          © ۱۴۰۴ KPI Tracker. تمامی حقوق محفوظ است.
        </div>
      </footer>
    </div>
  );
}