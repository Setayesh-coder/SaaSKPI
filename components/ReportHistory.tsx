// components/ReportHistory.tsx

'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { format } from 'date-fns'

type Report = {
  id: string
  created_at: string
  content: string
  // سایر فیلدها...
}

export default function ReportHistory({ employeeId }: { employeeId: string }) {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchReports() {
      const { data, error } = await supabase
        .from('daily_reports')
        .select('*')
        .eq('employee_id', employeeId)
        .order('created_at', { ascending: false })

      if (!error && data) setReports(data)
      setLoading(false)
    }

    fetchReports()
  }, [employeeId])

  if (loading) return <p>در حال بارگذاری...</p>

  if (reports.length === 0) return <p>گزارشی وجود ندارد.</p>

  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <div key={report.id} className="border rounded-lg p-4">
          <p className="text-sm text-gray-500">
            {format(new Date(report.created_at), 'yyyy/MM/dd')}
          </p>
          <p className="mt-2 whitespace-pre-wrap">{report.content}</p>
        </div>
      ))}
    </div>
  )
}