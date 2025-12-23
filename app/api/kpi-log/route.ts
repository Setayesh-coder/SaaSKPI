// app/api/kpi-log/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const supabase = await createClient()

    // چک auth
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const body = await request.json()
        const { employeeId, date, type = 'daily_report', data } = body

        // چک کن که کاربر فقط برای خودش لاگ بفرسته (یا مدیر باشه)
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()

        if (profile?.role !== 'manager' && employeeId !== user.id) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        const { data: log, error } = await supabase
            .from('kpi_logs')
            .insert({
                employee_id: employeeId,
                date,
                type,
                data,
            })
            .select()
            .single()

        if (error) throw error

        return NextResponse.json({ success: true, log })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}

export async function GET(request: Request) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const employeeId = searchParams.get('employeeId')
    const type = searchParams.get('type') || 'daily_report'

    try {
        let query = supabase
            .from('kpi_logs')
            .select('*')
            .eq('type', type)
            .order('date', { ascending: false })

        if (employeeId) {
            query = query.eq('employee_id', employeeId)
        }

        const { data: reports, error } = await query

        if (error) throw error

        return NextResponse.json({ reports })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}