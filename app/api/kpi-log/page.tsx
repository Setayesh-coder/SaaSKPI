'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function KPILogPage() {
    const [employeeKpis, setEmployeeKpis] = useState<any[]>([])
    const [selectedKpi, setSelectedKpi] = useState('')
    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // گرفتن KPI های تخصیص داده شده به کاربر
        supabase
            .from('employee_kpis')
            .select('id, kpi_id, kpi(name)')
            .eq('employee_id', supabase.auth.getUser().data?.user?.id)
            .then(({ data, error }) => {
                if (error) console.log(error)
                else setEmployeeKpis(data || [])
            })
    }, [])

    const handleSubmit = async () => {
        if (!selectedKpi || !value) return alert('Please select KPI and enter value')
        setLoading(true)

        const { error } = await supabase.from('kpi_logs').insert([
            {
                employee_kpi_id: selectedKpi,
                value: parseFloat(value),
            },
        ])

        setLoading(false)

        if (!error) {
            alert('KPI logged successfully!')
            setValue('')
        } else {
            alert(error.message)
        }
    }

    return (
        <div className="max-w-md mx-auto mt-20 space-y-4">
            <h1 className="text-xl font-bold">Log Your KPI</h1>

            <select
                className="w-full p-2 border rounded"
                onChange={e => setSelectedKpi(e.target.value)}
            >
                <option value="">Select KPI</option>
                {employeeKpis.map(k => (
                    <option key={k.id} value={k.id}>
                        {k.kpi.name}
                    </option>
                ))}
            </select>

            <Input
                type="number"
                placeholder="Enter value"
                value={value}
                onChange={e => setValue(e.target.value)}
            />

            <Button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Logging...' : 'Log KPI'}
            </Button>
        </div>
    )
}
