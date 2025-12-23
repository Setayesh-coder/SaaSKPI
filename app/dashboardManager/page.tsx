// // app/dashboardManager/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, Target, FileText, TrendingUp } from "lucide-react"

export default function ManagerDashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold mb-2">خوش آمدید، مدیر محترم!</h1>
                <p className="text-muted-foreground">بررسی اجمالی عملکرد تیم در یک نگاه</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">درآمد کل ماه جاری</CardTitle>
                        <DollarSign className="h-5 w-5 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">₼ ۴۸۵,۲۳۱</div>
                        <p className="text-xs text-green-600 flex items-center gap-1 mt-2">
                            <TrendingUp className="h-4 w-4" />
                            +۱۲.۵% نسبت به ماه قبل
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">تعداد کارمندان</CardTitle>
                        <Users className="h-5 w-5 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">۲۴ نفر</div>
                        <p className="text-xs text-muted-foreground mt-2">۲ نفر جدید این ماه</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">میانگین عملکرد تیم</CardTitle>
                        <Target className="h-5 w-5 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">۸۷%</div>
                        <p className="text-xs text-green-600 flex items-center gap-1 mt-2">
                            <TrendingUp className="h-4 w-4" />
                            +۵% بالاتر از هدف
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">گزارش‌های در انتظار</CardTitle>
                        <FileText className="h-5 w-5 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-orange-600">۸ مورد</div>
                        <p className="text-xs text-muted-foreground mt-2">نیاز به بررسی</p>
                    </CardContent>
                </Card>
            </div>

            <div className="bg-card rounded-xl p-8 border text-center">
                <p className="text-lg text-muted-foreground">
                    از منوی سمت چپ می‌توانید کارمندان را مدیریت کنید، گزارش‌های روزانه را بررسی کنید و آمار دقیق عملکرد را ببینید.
                </p>
            </div>
        </div>
    )
}