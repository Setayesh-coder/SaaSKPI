import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

export async function getUser() {
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll: () => cookies().getAll(),
                setAll: () => { },
            },
        }
    )

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) return null

    // گرفتن role از جدول profiles یا users
    const { data: profile } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()

    return {
        id: user.id,
        email: user.email,
        role: profile?.role,
    }
}
