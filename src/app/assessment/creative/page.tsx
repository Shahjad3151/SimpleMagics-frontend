'use client'
import { useRouter } from 'next/navigation'
import { Palette, Smartphone, PenTool, TrendingUp, Video, ArrowRight, CheckCircle2 } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'

const roles = [
    { icon: Palette, label: 'UI/UX Designer', desc: 'Figma, User Research, Prototyping, Design Systems', color: 'from-purple-500 to-pink-600' },
    { icon: Smartphone, label: 'Social Media Manager', desc: 'Content Strategy, Platform Algorithms, Analytics, Brand Voice', color: 'from-pink-500 to-rose-500' },
    { icon: PenTool, label: 'Content Strategist / Writer', desc: 'SEO Writing, Copywriting, Storytelling, Brand Tone', color: 'from-violet-500 to-purple-600' },
    { icon: TrendingUp, label: 'Digital Marketing Manager', desc: 'SEO/SEM, Google Ads, Email, Performance Marketing', color: 'from-fuchsia-500 to-pink-600' },
    { icon: Video, label: 'Content Creator / Influencer', desc: 'Video Strategy, Monetization, Brand Deals, Growth', color: 'from-rose-500 to-pink-500' },
]

const highlights = [
    '15 real-world creative & digital marketing questions',
    'Platform algorithms — Instagram, YouTube, LinkedIn growth tactics',
    'Content strategy, hooks, A/B testing, CPM revenue calculation',
    'UI/UX principles — "Don\'t Make Me Think", user research methods',
    'Crisis management, brand deal ethics, disclosure compliance',
    '35 minutes · Career roadmap with portfolio-building steps',
]

export default function CreativeTestPage() {
    const router = useRouter()

    return (
        <div className="min-h-screen mesh-bg">
            <Navbar />
            <div className="pt-24 pb-16 px-4">
                <div className="max-w-3xl mx-auto">

                    <div className="text-center mb-10 animate-in">
                        <div className="text-5xl mb-4">🎨</div>
                        <div className="inline-flex items-center gap-2 badge-brand mb-4">Creative & Social Media Track</div>
                        <h1 className="text-3xl font-display font-bold text-white mb-3">Creative & Digital Assessment</h1>
                        <p className="text-white/50 text-sm max-w-lg mx-auto leading-relaxed">
                            Creative careers are real, high-paying careers. This test goes beyond basics —
                            it tests platform strategy, monetization, analytics, and brand thinking that top creators and marketers know.
                        </p>
                    </div>

                    <div className="glass rounded-2xl p-6 border border-white/[0.08] mb-6 animate-in delay-100">
                        <p className="text-sm font-bold text-white mb-4">📋 What this test covers</p>
                        <div className="space-y-2.5">
                            {highlights.map((h, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <CheckCircle2 size={15} className="text-purple-400 flex-shrink-0 mt-0.5" />
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

                    <button onClick={() => router.push('/assessment/test?type=creative')} className="btn-primary w-full justify-center py-3.5 text-base">
                        Start Creative Assessment — 15 Questions
                        <ArrowRight size={18} />
                    </button>
                    <p className="text-center text-xs text-white/30 mt-3">35 minutes · Results with portfolio-building roadmap instantly</p>
                </div>
            </div>
        </div>
    )
}