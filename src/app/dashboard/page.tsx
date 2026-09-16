'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  User, Award, TrendingUp, ClipboardList, ArrowRight,
  CheckCircle2, Clock, BarChart3, Zap, Calendar, ChevronRight,
  PlayCircle, LogOut
} from 'lucide-react'
import { studentApi, resultApi } from '@/lib/api'
import { useAuthStore } from '@/lib/store'
import Navbar from '@/components/layout/Navbar'

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState<any>(null)
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { clearAuth, isAuthenticated } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated()) { router.push('/auth/login'); return }
    Promise.all([studentApi.getDashboard(), resultApi.getMyResults()])
      .then(([d, r]) => { setDashboard(d); setResults(r) })
      .catch(() => { clearAuth(); router.push('/auth/login') })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="min-h-screen mesh-bg flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-brand-500/30 border-t-brand-500 rounded-full animate-spin" />
    </div>
  )

  const profile = dashboard?.profile
  const latestResult = dashboard?.latest_result
  const categoryFit = profile?.category_fit

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      eligible: 'badge-green',
      moderately_eligible: 'badge-amber',
      needs_improvement: 'badge-red',
    }
    return map[status] || 'badge-brand'
  }

  const statusLabel = (status: string) => {
    const map: Record<string, string> = {
      eligible: 'Eligible',
      moderately_eligible: 'Moderate',
      needs_improvement: 'Needs Work',
    }
    return map[status] || status
  }

  return (
    <div className="min-h-screen mesh-bg">
      <Navbar />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Welcome header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 animate-in">
            <div>
              <h1 className="text-2xl font-display font-bold text-white">
                Welcome back, {profile?.full_name?.split(' ')[0] || 'Student'} 👋
              </h1>
              <p className="text-white/40 text-sm mt-1">
                {profile?.email} · {profile?.college_name || 'Your institution'}
              </p>
            </div>
            {profile?.profile_completed && !latestResult && (
              <Link href="/assessment/profile" className="btn-primary">
                <PlayCircle size={16} /> Start Assessment
              </Link>
            )}
            {categoryFit === 'IT' && (
              <Link href="/assessment/technical" className="btn-primary">
                <Zap size={16} /> Continue IT Test
              </Link>
            )}
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Tests Taken', value: dashboard?.total_tests || 0, icon: ClipboardList, color: 'text-brand-400', bg: 'bg-brand-500/10' },
              { label: 'Completed', value: dashboard?.completed_tests || 0, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
              { label: 'Best Score', value: results.length ? `${Math.round(Math.max(...results.map((r:any) => r.percentage)))}%` : '—', icon: Award, color: 'text-amber-400', bg: 'bg-amber-500/10' },
              { label: 'Category Fit', value: categoryFit || 'Pending', icon: TrendingUp, color: 'text-accent-400', bg: 'bg-accent-500/10' },
            ].map(s => {
              const Icon = s.icon
              return (
                <div key={s.label} className="glass rounded-2xl p-5 border border-white/[0.08] animate-in">
                  <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                    <Icon size={17} className={s.color} />
                  </div>
                  <p className="text-2xl font-display font-bold text-white">{s.value}</p>
                  <p className="text-xs text-white/40 mt-0.5">{s.label}</p>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile card */}
            <div className="glass rounded-2xl p-6 border border-white/[0.08] animate-in delay-100">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">{profile?.full_name || 'Student'}</p>
                  <p className="text-xs text-white/40">{profile?.education}</p>
                </div>
              </div>
              <div className="space-y-2.5">
                {[
                  { label: 'College', value: profile?.college_name },
                  { label: 'Graduation', value: profile?.graduation_year },
                  { label: 'Status', value: profile?.current_status },
                  { label: 'Recommended Track', value: profile?.category_fit },
                  { label: 'Specialization', value: profile?.assigned_domain },
                ].filter(i => i.value).map(item => (
                  <div key={item.label} className="flex justify-between text-sm">
                    <span className="text-white/40">{item.label}</span>
                    <span className="text-white/70 text-right max-w-[60%] truncate">{item.value}</span>
                  </div>
                ))}
              </div>
              <Link href="/onboarding" className="btn-secondary w-full justify-center mt-4 text-sm py-2">
                Edit Profile
              </Link>
            </div>

            {/* Latest result + test history */}
            <div className="lg:col-span-2 space-y-5">
              {/* Latest result */}
              {latestResult ? (
                <div className="glass rounded-2xl p-6 border border-white/[0.08] animate-in delay-200">
                  <p className="text-sm font-semibold text-white/70 mb-4 flex items-center gap-2">
                    <BarChart3 size={15} className="text-brand-400" /> Latest Result
                  </p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500/20 to-accent-500/20 border border-brand-500/30 flex items-center justify-center flex-col">
                      <p className="text-xl font-display font-bold text-white">{Math.round(latestResult.percentage)}%</p>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {latestResult.category_fit && <span className="badge-brand">{latestResult.category_fit}</span>}
                        {latestResult.eligibility_status && (
                          <span className={`badge ${statusBadge(latestResult.eligibility_status)}`}>
                            {statusLabel(latestResult.eligibility_status)}
                          </span>
                        )}
                      </div>
                      {latestResult.domain_fit && <p className="text-sm text-white/50">{latestResult.domain_fit} {latestResult.technology_fit ? `· ${latestResult.technology_fit}` : ''}</p>}
                      <div className="progress-bar mt-3">
                        <div className="progress-fill" style={{ width: `${latestResult.percentage}%` }} />
                      </div>
                    </div>
                  </div>
                  <Link href={`/results/${latestResult.id}`} className="btn-secondary w-full justify-center text-sm py-2.5">
                    View Full Report <ChevronRight size={14} />
                  </Link>
                </div>
              ) : (
                <div className="glass rounded-2xl p-8 border border-white/[0.08] text-center animate-in delay-200">
                  <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mx-auto mb-4">
                    <PlayCircle size={22} className="text-brand-400" />
                  </div>
                  <p className="font-semibold text-white mb-1">No tests taken yet</p>
                  <p className="text-sm text-white/40 mb-4">Start your profile assessment to get your eligibility report</p>
                  <Link href="/assessment/profile" className="btn-primary inline-flex">
                    Start Assessment <ArrowRight size={15} />
                  </Link>
                </div>
              )}

              {/* Test history */}
              {results.length > 0 && (
                <div className="glass rounded-2xl p-6 border border-white/[0.08] animate-in delay-300">
                  <p className="text-sm font-semibold text-white/70 mb-4 flex items-center gap-2">
                    <Calendar size={15} className="text-brand-400" /> Test History
                  </p>
                  <div className="space-y-2.5">
                    {results.slice().reverse().map((r: any) => (
                      <Link key={r.id} href={`/results/${r.id}`}
                        className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-brand-500/20 transition-all group">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold
                            ${r.percentage >= 75 ? 'bg-emerald-500/20 text-emerald-300' :
                              r.percentage >= 50 ? 'bg-amber-500/20 text-amber-300' :
                              'bg-red-500/20 text-red-300'}`}>
                            {Math.round(r.percentage)}%
                          </div>
                          <div>
                            <p className="text-sm text-white/80">
                              {r.category_fit} {r.domain_fit ? `· ${r.domain_fit}` : ''}
                            </p>
                            <p className="text-xs text-white/30">{new Date(r.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <ChevronRight size={14} className="text-white/30 group-hover:text-white/60 transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
