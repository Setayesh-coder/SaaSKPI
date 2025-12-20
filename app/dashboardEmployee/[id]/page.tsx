//  forms
//  crud operations
// api kpi log

// components/EmployeeDashboard.tsx (Client Component)

'use client'

import DailyReportForm from '@/components/DailyReportForm'
import ReportHistory from '@/components/ReportHistory'

export default function EmployeeDashboard({ employeeId }: { employeeId: string }) {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-semibold mb-4">وظایف امروز</h2>
        {/* <TaskList employeeId={employeeId} /> */}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">گزارش روزانه</h2>
        <DailyReportForm employeeId={employeeId} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">تاریخچه گزارش‌ها</h2>
        <ReportHistory employeeId={employeeId} />
      </section>
    </div>
  )
}