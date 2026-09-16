'use client'
import { useRouter } from 'next/navigation'
import { Users, Search, BookOpen, BarChart3, Heart, ArrowRight, CheckCircle2 } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'

const roles = [
    { icon: Search, label: 'Talent Acquisition Specialist', desc: 'Sourcing, Screening, ATS, LinkedIn Recruiter, Offers', color: 'from-pink-500 to-rose-600' },
    { icon: Users, label: 'HR Business Partner', desc: 'Generalist, Employee Relations, Culture, Compliance', color: 'from-rose-500 to-pink-600' },
    { icon: BookOpen, label: 'Learning & Development (L&D)', desc: 'Training Design, Kirkpatrick Model, E-Learning', color: 'from-purple-500 to-pink-600' },
    { icon: BarChart3, label: 'HR Analyst', desc: 'People Analytics, HRIS, Dashboards, Attrition Analysis', color: 'from-fuchsia-500 to-purple-600' },
    { icon: Heart, label: 'Compensation & Benefits', desc: 'Salary Benchmarking, Benefits Design, Total Rewards', color: 'from-pink-600 to-rose-700' },
]

const highlights = [
    '15 hard HR questions — not textbook, real workplace scenarios',
    'Talent acquisition strategy, structured interviewing, bias detection',
    'Employee relations, grievance handling, labour law basics',
    'L&D frameworks: Kirkpatrick Model, 70-20-10, ADDIE',
    '35 minutes · Career roadmap with HR certification guide',
]

export default function HRTestPage() {
    const router = useRouter()

    return (
        <div className="min-h-screen mesh-bg">
            <Navbar />
            <div className="pt-24 pb-16 px-4">
                <div className="max-w-3xl mx-auto">

                    <div className="text-center mb-10 animate-in">
                        <div className="text-5xl mb-4">👥</div>
                        <div className="inline-flex items-center gap-2 badge-brand mb-4">HR & People Track</div>
                        <h1 className="text-3xl font-display font-bold text-white mb-3">HR & Talent Acquisition Assessment</h1>
                        <p className="text-white/50 text-sm max-w-lg mx-auto leading-relaxed">
                            People are every company's greatest asset. This test reveals whether you have the mindset,
                            strategy, and empathy to build world-class teams and cultures.
                        </p>
                    </div>

                    <div className="glass rounded-2xl p-6 border border-white/[0.08] mb-6 animate-in delay-100">
                        <p className="text-sm font-bold text-white mb-4">📋 What this test covers</p>
                        <div className="space-y-2.5">
                            {highlights.map((h, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <CheckCircle2 size={15} className="text-pink-400 flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-white/60">{h}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass rounded-2xl p-6 border border-white/[0.08] mb-8 animate-in delay-200">
                        <p className="text-sm font-bold text-white mb-4">🎯 Career paths this unlocks</p>
                        <div className="space-y-3">
                            {roles.map(role => {
                                const Icon = role.icon
                                return (
                                    <div key={role.label} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                                        <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${role.color} flex items-center justify-center flex-shrink-0`}>
                                            <Icon size={16} className="text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-white">{role.label}</p>
                                            <p className="text-xs text-white/40">{role.desc}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <button onClick={() => router.push('/assessment/test?type=hr')} className="btn-primary w-full justify-center py-3.5 text-base">
                        Start HR Assessment — 15 Questions
                        <ArrowRight size={18} />
                    </button>
                    <p className="text-center text-xs text-white/30 mt-3">35 minutes · Results with HR career roadmap instantly</p>
                </div>
            </div>
        </div>
    )
}