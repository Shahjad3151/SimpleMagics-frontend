'use client'
import { useRouter } from 'next/navigation'
import { TrendingUp, FileText, BarChart3, Scale, Receipt, ArrowRight, CheckCircle2 } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'

const roles = [
    { icon: FileText, label: 'Chartered Accountant (CA)', desc: 'Taxation, Audit, Financial Reporting, Companies Act', color: 'from-green-500 to-emerald-600' },
    { icon: BarChart3, label: 'Financial Analyst', desc: 'Valuation, Financial Modeling, Equity Research, CFA', color: 'from-teal-500 to-cyan-600' },
    { icon: TrendingUp, label: 'Investment Banking', desc: 'M&A, Capital Markets, IPO, Deal Structuring', color: 'from-blue-500 to-indigo-600' },
    { icon: Receipt, label: 'Tax Consultant', desc: 'GST, Income Tax, Transfer Pricing, Compliance', color: 'from-emerald-500 to-green-600' },
    { icon: Scale, label: 'Audit & Assurance', desc: 'Internal Audit, Risk Management, Controls, SOX', color: 'from-cyan-500 to-teal-600' },
]

const highlights = [
    '15 hard questions covering real CA exam scenarios',
    'Financial ratios, P&L analysis, balance sheet interpretation',
    'GST, income tax, deferred tax concepts',
    'Investment valuation — NPV, IRR, DCF',
    '45 minutes · Detailed career roadmap after completion',
]

export default function FinanceTestPage() {
    const router = useRouter()

    const start = () => {
        router.push('/assessment/test?type=finance')
    }

    return (
        <div className="min-h-screen mesh-bg">
            <Navbar />
            <div className="pt-24 pb-16 px-4">
                <div className="max-w-3xl mx-auto">

                    <div className="text-center mb-10 animate-in">
                        <div className="text-5xl mb-4">💰</div>
                        <div className="inline-flex items-center gap-2 badge-brand mb-4">Finance & CA Track</div>
                        <h1 className="text-3xl font-display font-bold text-white mb-3">Finance & Accounting Assessment</h1>
                        <p className="text-white/50 text-sm max-w-lg mx-auto leading-relaxed">
                            Test your financial knowledge with questions that mirror real CA exams,
                            analyst interviews, and finance job assessments.
                        </p>
                    </div>

                    {/* What's tested */}
                    <div className="glass rounded-2xl p-6 border border-white/[0.08] mb-6 animate-in delay-100">
                        <p className="text-sm font-bold text-white mb-4">📋 What this test covers</p>
                        <div className="space-y-2.5">
                            {highlights.map((h, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <CheckCircle2 size={15} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-white/60">{h}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Career roles */}
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

                    <button onClick={start} className="btn-primary w-full justify-center py-3.5 text-base">
                        Start Finance Assessment — 15 Questions
                        <ArrowRight size={18} />
                    </button>
                    <p className="text-center text-xs text-white/30 mt-3">45 minutes · Results with career roadmap instantly</p>
                </div>
            </div>
        </div>
    )
}