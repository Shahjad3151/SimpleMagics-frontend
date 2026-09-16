'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { authApi } from '@/lib/api'
import { useAuthStore } from '@/lib/store'

const perks = ['Free eligibility assessment', 'Domain-specific testing', 'Instant results & report', 'Career roadmap']

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const { setAuth } = useAuthStore()
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) { toast.error('Fill in all fields'); return }
    if (password !== confirmPw) { toast.error('Passwords do not match'); return }
    if (password.length < 6) { toast.error('Password must be at least 6 characters'); return }
    setLoading(true)
    try {
      const data = await authApi.register(email, password)
      setAuth(data.access_token, data.user_id, data.is_admin, false)
      toast.success('Account created!')
      router.push('/onboarding')
    } catch (err: any) {
      toast.error(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen mesh-bg flex items-center justify-center p-4">
      <div className="fixed top-20 right-1/4 w-80 h-80 bg-accent-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 left-1/4 w-80 h-80 bg-brand-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 animate-in">
        {/* Left panel */}
        <div className="hidden md:flex flex-col justify-center">
          <Link href="/" className="flex items-center gap-2.5 mb-10">
            <Image src="/logo.png" alt="SimpleMagics" width={40} height={29} />
            <span className="font-display font-bold text-xl text-white">Simple<span className="text-brand-300">magics</span></span>
          </Link>

          <h2 className="text-3xl font-display font-bold text-white mb-4 leading-tight">
            Start your career<br />
            <span className="gradient-text">discovery journey</span>
          </h2>
          <p className="text-white/50 text-sm leading-relaxed mb-8">
            Join thousands who used SimpleMagics to unlock clarity about their career direction and domain strengths.
          </p>

          <div className="space-y-3">
            {perks.map(p => (
              <div key={p} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-brand-500/20 border border-brand-500/40 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 size={12} className="text-brand-400" />
                </div>
                <span className="text-sm text-white/60">{p}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Register form */}
        <div>
          <Link href="/" className="md:hidden flex items-center gap-2 justify-center mb-6">
            <Image src="/logo.png" alt="SimpleMagics" width={32} height={23} />
            <span className="font-display font-bold text-white">Simple<span className="text-brand-300">magics</span></span>
          </Link>

          <div className="glass rounded-3xl p-8 border border-white/[0.08]">
            <div className="mb-7">
              <h1 className="text-2xl font-display font-bold text-white mb-1">Create account</h1>
              <p className="text-sm text-white/40">Start your free assessment today</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="label">Email address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="input pl-10" />
                </div>
              </div>

              <div>
                <label className="label">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                  <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 6 characters" className="input pl-10 pr-10" />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="label">Confirm password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                  <input type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} placeholder="Re-enter password" className="input pl-10" />
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 mt-2 disabled:opacity-50">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Creating account...
                  </span>
                ) : <>Create Account <ArrowRight size={16} /></>}
              </button>
            </form>
          </div>

          <p className="text-center text-sm text-white/40 mt-5">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-brand-400 hover:text-brand-300 font-medium transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
