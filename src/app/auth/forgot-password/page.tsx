'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen mesh-bg flex items-center justify-center p-4">
      <div className="fixed top-20 left-1/3 w-72 h-72 bg-brand-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="w-full max-w-md animate-in">
        <Link href="/" className="flex items-center gap-2.5 justify-center mb-8">
          <Image src="/logo.png" alt="SimpleMagics" width={40} height={29} />
          <span className="font-display font-bold text-xl text-white">Simple<span className="text-brand-300">magics</span></span>
        </Link>

        <div className="glass rounded-3xl p-8 border border-white/[0.08]">
          {!submitted ? (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-display font-bold text-white mb-1.5">Forgot password?</h1>
                <p className="text-sm text-white/40">Enter your email to receive a reset link</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="label">Email address</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="input pl-10" />
                  </div>
                </div>
                <button type="submit" className="btn-primary w-full justify-center py-3.5">
                  Send Reset Link
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 size={28} className="text-emerald-400" />
              </div>
              <h2 className="text-xl font-display font-bold text-white mb-2">Check your email</h2>
              <p className="text-sm text-white/50 mb-6">
                If <strong className="text-white/70">{email}</strong> is registered, you'll receive a reset link shortly.
              </p>
              <Link href="/auth/login" className="btn-secondary inline-flex">
                Back to Sign In
              </Link>
            </div>
          )}
        </div>

        <div className="text-center mt-5">
          <Link href="/auth/login" className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors">
            <ArrowLeft size={14} /> Back to login
          </Link>
        </div>
      </div>
    </div>
  )
}
