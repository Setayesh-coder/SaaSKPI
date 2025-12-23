// 'use client'

// import { useState } from 'react'
// import { supabase } from '@/lib/supabase/client'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { useRouter } from 'next/navigation'

// export default function LoginPage() {
//     const router = useRouter()
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [loading, setLoading] = useState(false)

//     const handleLogin = async () => {
//         setLoading(true)

//         const { data, error } = await supabase.auth.signInWithPassword({
//             email,
//             password,
//         })

//         setLoading(false)

//         if (error) {
//             alert(error.message)
//             return
//         }

//         if (!data.user) return


//         const role = data.user.app_metadata?.role || data.user.user_metadata?.role

//         if (role === 'manager') {
//             router.push('/dashboardManager')  
//         } else {

//             const employeeId = data.user.id
//             router.push(`/dashboardEmployee/${employeeId}`)
//         }
//     }

//     return (
//         <div className="max-w-sm mx-auto mt-40 space-y-4">
//             <h1 className="text-xl font-bold">Login</h1>

//             <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
//             <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />

//             <Button className="w-full" onClick={handleLogin} disabled={loading}>
//                 {loading ? 'Loading...' : 'Login'}
//             </Button>
//         </div>
//     )
// }
// app/login/page.tsx
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'

const supabase = createClient()

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        setLoading(true)
        toast.loading('در حال ورود...')

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            toast.error('خطا در ورود', { description: error.message })
            setLoading(false)
            return
        }

        // کاربر لاگین شد، حالا نقش رو از profiles بگیریم
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', data.user.id)
            .single()

        toast.dismiss()

        if (profile?.role === 'manager') {
            toast.success('خوش آمدید، مدیر!')
            window.location.href = '/dashboardManager'
        } else {
            toast.success('خوش آمدید!')
            window.location.href = `/dashboardEmployee/${data.user.id}` // یا هر id که لازم داری
        }

        setLoading(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30">
            <Card className="w-full max-w-sm p-8 space-y-6">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">ورود به KPI Tracker</h1>
                    <p className="text-sm text-muted-foreground mt-2">با ایمیل و رمز عبور وارد شوید</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <Label htmlFor="email">ایمیل</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="password">رمز عبور</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <Button
                        onClick={handleLogin}
                        disabled={loading}
                        className="w-full"
                        size="lg"
                    >
                        {loading ? 'در حال ورود...' : 'ورود'}
                    </Button>
                </div>
            </Card>
        </div>
    )
}