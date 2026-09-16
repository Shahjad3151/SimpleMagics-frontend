'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { authApi } from '@/lib/api'
import { useAuthStore } from '@/lib/store'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const { setAuth } = useAuthStore()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) { toast.error('Fill in all fields'); return }
    setLoading(true)
    try {
      const data = await authApi.login(email, password)
      setAuth(data.access_token, data.user_id, data.is_admin, data.profile_completed)
      toast.success('Welcome back!')
      if (data.is_admin) router.push('/admin')
      else if (!data.profile_completed) router.push('/onboarding')
      else router.push('/dashboard')
    } catch (err: any) {
      toast.error(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen mesh-bg flex items-center justify-center p-4">
      {/* BG orbs */}
      <div className="fixed top-20 left-1/3 w-80 h-80 bg-brand-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 right-1/3 w-80 h-80 bg-accent-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md animate-in">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 justify-center mb-8">
          <Image src="/logo.png" alt="SimpleMagics" width={40} height={29} />
          <span className="font-display font-bold text-xl text-white">
            Simple<span className="text-brand-300">magics</span>
          </span>
        </Link>

        <div className="glass rounded-3xl p-8 border border-white/[0.08]">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-display font-bold text-white mb-1.5">Welcome back</h1>
            <p className="text-sm text-white/40">Sign in to continue your assessment journey</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="label">Email address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input pl-10"
                />
              </div>
            </div>

            <div>
              <label className="label">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input pl-10 pr-10"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link href="/auth/forgot-password" className="text-xs text-brand-400 hover:text-brand-300 transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3.5 text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Signing in...
                </span>
              ) : (
                <>Sign In <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          {/* Demo creds hint */}
          <div className="mt-5 p-3.5 rounded-xl bg-brand-500/[0.08] border border-brand-500/20">
            <p className="text-xs text-brand-300/80 text-center">
              <strong>Admin demo:</strong> admin@eligibilitypro.com / Admin@123
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-white/40 mt-6">
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-brand-400 hover:text-brand-300 font-medium transition-colors">
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  )
}
