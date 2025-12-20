// app/dashboard/layout.tsx
'use client'

import { supabase } from '@/lib/supabase/client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            if (!data.session) router.push('/login')
        })
    }, [])

    return <>{children}</>
}
