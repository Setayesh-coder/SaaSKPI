'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function SignUpPage() {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSignUp = async () => {
        setLoading(true)


        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
        })

        if (authError) {
            alert(authError.message)
            setLoading(false)
            return
        }

        const userId = authData.user?.id
        if (!userId) {
            alert('User ID not generated')
            setLoading(false)
            return
        }

        const { data: companyData, error: companyError } = await supabase
            .from('companies')
            .insert([{ name: companyName }])
            .select()
            .single()

        if (companyError) {
            alert(companyError.message)
            setLoading(false)
            return
        }

        const company_id = companyData.id

        const { error: userError } = await supabase
            .from('users')
            .insert([
                {
                    auth_user_id: userId,
                    email,
                    name,
                    role: 'super_admin',
                    company_id,
                },
            ])

        if (userError) {
            alert(userError.message)
            setLoading(false)
            return
        }


        router.push('/dashboard')
    }

    return (
        <div className="max-w-sm mx-auto mt-40 space-y-4">
            <h1 className="text-xl font-bold text-center">Sign Up Super Admin</h1>
            <Input placeholder="Your Name" onChange={e => setName(e.target.value)} />
            <Input placeholder="Company Name" onChange={e => setCompanyName(e.target.value)} />
            <Input placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <Input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <Button className="w-full" onClick={handleSignUp}>
                {loading ? 'Signing up...' : 'Sign Up'}
            </Button>
        </div>
    )
}
