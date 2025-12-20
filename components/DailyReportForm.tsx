// components/DailyReportForm.tsx

'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function DailyReportForm({ employeeId }: { employeeId: string }) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async () => {
    if (!content.trim()) return

    setLoading(true)

    const { error } = await supabase
      .from('daily_reports')
      .insert({
        employee_id: employeeId,
        content: content.trim(),
      })

    setLoading(false)

    if (!error) {
      setContent('')
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } else {
      alert('خطا در ارسال گزارش')
    }
  }

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="گزارش امروز خود را بنویسید..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={8}
      />

      <Button onClick={handleSubmit} disabled={loading || !content.trim()}>
        {loading ? 'در حال ارسال...' : 'ارسال گزارش'}
      </Button>

      {success && <p className="text-green-600">گزارش با موفقیت ارسال شد.</p>}
    </div>
  )
}