'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Users, ClipboardList, CheckCircle2, TrendingUp, BarChart3,
  Search, ChevronRight, Shield, LogOut, Database, Settings
} from 'lucide-react'
import { adminApi, questionApi } from '@/lib/api'
import { useAuthStore } from '@/lib/store'
import Navbar from '@/components/layout/Navbar'

const ADMIN_TABS = ['Overview', 'Students', 'Questions'] as const
type Tab = typeof ADMIN_TABS[number]

export default function AdminPage() {
  const [stats, setStats] = useState<any>(null)
  const [students, setStudents] = useState<any[]>([])
  const [questions, setQuestions] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<Tab>('Overview')
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showQModal, setShowQModal] = useState(false)
  const { isAdmin, isAuthenticated, clearAuth } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated() || !isAdmin) { router.push('/auth/login'); return }
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [s, st] = await Promise.all([adminApi.getStats(), adminApi.getStudents()])
      setStats(s); setStudents(st)
    } finally {
      setLoading(false)
    }
  }

  const loadQuestions = async () => {
    if (questions.length > 0) return
    try {
      const q = await questionApi.getQuestions()
      setQuestions(q)
    } catch {}
  }

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab)
    if (tab === 'Questions') loadQuestions()
  }

  const filteredStudents = students.filter(s =>
    s.email?.toLowerCase().includes(search.toLowerCase()) ||
    s.profile?.full_name?.toLowerCase().includes(search.toLowerCase())
  )

  const statusBadge = (status: string) => {
    const map: Record<string, string> = { eligible: 'badge-green', moderately_eligible: 'badge-amber', needs_improvement: 'badge-red' }
    const lbl: Record<string, string> = { eligible: 'Eligible', moderately_eligible: 'Moderate', needs_improvement: 'Needs Work' }
    return { cls: map[status] || 'badge-brand', label: lbl[status] || status }
  }

  if (loading) return (
    <div className="min-h-screen mesh-bg flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-brand-500/30 border-t-brand-500 rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="min-h-screen mesh-bg">
      <Navbar />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 animate-in">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Shield size={18} className="text-brand-400" />
                <span className="text-xs font-semibold text-brand-400 uppercase tracking-widest">Admin Panel</span>
              </div>
              <h1 className="text-2xl font-display font-bold text-white">Platform Dashboard</h1>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 p-1 glass rounded-xl border border-white/[0.08] w-fit mb-8">
            {ADMIN_TABS.map(tab => (
              <button key={tab} onClick={() => handleTabChange(tab)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab ? 'bg-brand-500 text-white shadow-lg shadow-brand-900/30' : 'text-white/50 hover:text-white'
                }`}>
                {tab}
              </button>
            ))}
          </div>

          {/* OVERVIEW TAB */}
          {activeTab === 'Overview' && stats && (
            <div className="space-y-6 animate-in">
              {/* Stat cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Students', value: stats.total_students, icon: Users, color: 'text-brand-400', bg: 'bg-brand-500/10' },
                  { label: 'Tests Completed', value: stats.total_tests_completed, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                  { label: 'Pending Tests', value: stats.total_tests_pending, icon: ClipboardList, color: 'text-amber-400', bg: 'bg-amber-500/10' },
                  { label: 'Avg Score', value: `${stats.avg_score}%`, icon: TrendingUp, color: 'text-accent-400', bg: 'bg-accent-500/10' },
                ].map(s => {
                  const Icon = s.icon
                  return (
                    <div key={s.label} className="glass rounded-2xl p-5 border border-white/[0.08]">
                      <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                        <Icon size={17} className={s.color} />
                      </div>
                      <p className="text-2xl font-display font-bold text-white">{s.value}</p>
                      <p className="text-xs text-white/40 mt-0.5">{s.label}</p>
                    </div>
                  )
                })}
              </div>

              {/* Distribution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="glass rounded-2xl p-6 border border-white/[0.08]">
                  <p className="text-sm font-semibold text-white/70 mb-5 flex items-center gap-2">
                    <BarChart3 size={14} className="text-brand-400" /> Category Distribution
                  </p>
                  {Object.entries(stats.category_distribution || {}).length === 0 ? (
                    <p className="text-sm text-white/30 text-center py-4">No data yet</p>
                  ) : (
                    <div className="space-y-3">
                      {Object.entries(stats.category_distribution || {}).map(([cat, count]: any) => {
                        const total = Object.values(stats.category_distribution || {}).reduce((a: any, b: any) => a + b, 0) as number
                        const pct = total > 0 ? Math.round((count / total) * 100) : 0
                        const colors: Record<string, string> = { IT: 'bg-brand-500', 'Non-IT': 'bg-emerald-500', Management: 'bg-accent-500' }
                        return (
                          <div key={cat}>
                            <div className="flex justify-between text-sm mb-1.5">
                              <span className="text-white/70">{cat}</span>
                              <span className="text-white/50">{count} ({pct}%)</span>
                            </div>
                            <div className="progress-bar">
                              <div className={`h-full rounded-full ${colors[cat] || 'bg-brand-500'} transition-all duration-700`} style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                <div className="glass rounded-2xl p-6 border border-white/[0.08]">
                  <p className="text-sm font-semibold text-white/70 mb-5 flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-400" /> Eligibility Distribution
                  </p>
                  {Object.entries(stats.eligibility_distribution || {}).length === 0 ? (
                    <p className="text-sm text-white/30 text-center py-4">No data yet</p>
                  ) : (
                    <div className="space-y-3">
                      {Object.entries(stats.eligibility_distribution || {}).map(([status, count]: any) => {
                        const total = Object.values(stats.eligibility_distribution || {}).reduce((a: any, b: any) => a + b, 0) as number
                        const pct = total > 0 ? Math.round((count / total) * 100) : 0
                        const colors: Record<string, string> = { eligible: 'bg-emerald-500', moderately_eligible: 'bg-amber-500', needs_improvement: 'bg-red-500' }
                        const labels: Record<string, string> = { eligible: 'Eligible', moderately_eligible: 'Moderately Eligible', needs_improvement: 'Needs Improvement' }
                        return (
                          <div key={status}>
                            <div className="flex justify-between text-sm mb-1.5">
                              <span className="text-white/70">{labels[status] || status}</span>
                              <span className="text-white/50">{count} ({pct}%)</span>
                            </div>
                            <div className="progress-bar">
                              <div className={`h-full rounded-full ${colors[status] || 'bg-brand-500'} transition-all duration-700`} style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STUDENTS TAB */}
          {activeTab === 'Students' && (
            <div className="animate-in">
              <div className="flex items-center gap-3 mb-5">
                <div className="relative flex-1 max-w-sm">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search students..." className="input pl-9 py-2.5 text-sm" />
                </div>
                <span className="text-sm text-white/40">{filteredStudents.length} students</span>
              </div>

              <div className="glass rounded-2xl border border-white/[0.08] overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      {['Student', 'Category', 'Score', 'Status', 'Joined', 'Actions'].map(h => (
                        <th key={h} className="text-left px-5 py-4 text-xs font-semibold text-white/40 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {filteredStudents.length === 0 ? (
                      <tr><td colSpan={6} className="text-center py-10 text-white/30">No students found</td></tr>
                    ) : filteredStudents.map(s => {
                      const eStatus = s.latest_result?.eligibility_status
                      const { cls, label } = eStatus ? statusBadge(eStatus) : { cls: 'badge-brand', label: 'Pending' }
                      return (
                        <tr key={s.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-5 py-4">
                            <p className="font-medium text-white">{s.profile?.full_name || '—'}</p>
                            <p className="text-xs text-white/40">{s.email}</p>
                          </td>
                          <td className="px-5 py-4">
                            {s.profile?.category_fit ? (
                              <span className="badge-brand">{s.profile.category_fit}</span>
                            ) : <span className="text-white/30">—</span>}
                          </td>
                          <td className="px-5 py-4">
                            {s.latest_result ? (
                              <span className={`font-semibold ${s.latest_result.percentage >= 75 ? 'text-emerald-400' : s.latest_result.percentage >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
                                {Math.round(s.latest_result.percentage)}%
                              </span>
                            ) : <span className="text-white/30">—</span>}
                          </td>
                          <td className="px-5 py-4">
                            <span className={`badge ${cls}`}>{label}</span>
                          </td>
                          <td className="px-5 py-4 text-white/40 text-xs">
                            {new Date(s.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-5 py-4">
                            <button className="text-brand-400 hover:text-brand-300 transition-colors flex items-center gap-1 text-xs font-medium">
                              Report <ChevronRight size={12} />
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* QUESTIONS TAB */}
          {activeTab === 'Questions' && (
            <div className="animate-in">
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm text-white/50">{questions.length} questions in bank</p>
                <button onClick={() => setShowQModal(true)} className="btn-primary text-sm py-2.5 px-5">
                  + Add Question
                </button>
              </div>

              <div className="glass rounded-2xl border border-white/[0.08] overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      {['Question', 'Type', 'Category', 'Domain', 'Difficulty', 'Marks'].map(h => (
                        <th key={h} className="text-left px-4 py-3.5 text-xs font-semibold text-white/40 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {questions.length === 0 ? (
                      <tr><td colSpan={6} className="text-center py-10 text-white/30">Loading questions...</td></tr>
                    ) : questions.map((q: any) => (
                      <tr key={q.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-4 py-3.5 max-w-xs">
                          <p className="text-white/80 truncate">{q.question_text}</p>
                          {q.is_profile_question && <span className="text-xs text-brand-400">Profile Question</span>}
                        </td>
                        <td className="px-4 py-3.5"><span className="badge-brand text-xs">{q.question_type}</span></td>
                        <td className="px-4 py-3.5 text-white/50">{q.category || '—'}</td>
                        <td className="px-4 py-3.5 text-white/50">{q.domain || '—'}</td>
                        <td className="px-4 py-3.5">
                          <span className={`badge text-xs ${q.difficulty === 'hard' ? 'badge-red' : q.difficulty === 'medium' ? 'badge-amber' : 'badge-green'}`}>
                            {q.difficulty}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-white/70">{q.marks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
