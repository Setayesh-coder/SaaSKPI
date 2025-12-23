// // app/dashboardManager/layout.tsx
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { SidebarNav } from '@/components/manager/SidebarNav'
import { Toaster } from '@/components/ui/sonner'

export default async function ManagerLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // فرض می‌کنیم نقش کاربر در metadata یا profile ذخیره شده
    // اگر از جدول profiles استفاده می‌کنی:
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'manager') {
        redirect('/dashboardEmployee') // یا صفحه خطای 403
    }

    return (
        <div className="flex h-screen bg-background">
            <SidebarNav />
            <div className="flex-1 overflow-auto">
                <div className="p-8">
                    {children}
                </div>
            </div>
            <Toaster />
        </div>
    )
}