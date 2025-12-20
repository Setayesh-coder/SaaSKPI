'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        setLoading(true)

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        setLoading(false)
        // if employee => go to dashboardEmployee
        // if manager => go to dashboardManager

        if (!error) router.push('/dashboardEmployee')
        else alert(error.message)
    }

    return (
        <div className="max-w-sm mx-auto mt-40 space-y-4">
            <h1 className="text-xl font-bold">Login</h1>

            <Input placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <Input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

            <Button className="w-full" onClick={handleLogin} disabled={loading}>
                Login
            </Button>
        </div>
    )
}
