'use client'
import Link from 'next/link'
import { ArrowRight, BookOpen, MessageSquare, Brain, Briefcase, Clock, FileText } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'

const sections = [
  { icon: Brain, label: 'Aptitude & Reasoning', desc: 'Numerical, logical, and analytical reasoning questions', count: 4 },
  { icon: MessageSquare, label: 'Communication & Verbal', desc: 'Vocabulary, grammar, and verbal ability', count: 3 },
  { icon: Briefcase, label: 'Workplace Readiness', desc: 'Situational judgment and professional behavior', count: 2 },
  { icon: FileText, label: 'Analytical Thinking', desc: 'Data interpretation and problem analysis', count: 3 },
]

export default function NonITTestPage() {
  return (
    <div className="min-h-screen mesh-bg">
      <Navbar />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10 animate-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-300 text-sm font-medium mb-4">
              ✅ Non-IT Track Confirmed
            </div>
            <h1 className="text-3xl font-display font-bold text-white mb-3">Non-IT Assessment</h1>
            <p className="text-white/50 text-sm leading-relaxed">
              This assessment evaluates your aptitude, communication, reasoning, and workplace readiness — key skills for non-technical career roles.
            </p>
          </div>

          {/* Info bar */}
          <div className="glass rounded-2xl p-5 border border-white/[0.08] mb-6 flex flex-wrap gap-5 justify-center animate-in delay-100">
            {[
              { icon: FileText, label: '10 Questions' },
              { icon: Clock, label: '30 Minutes' },
              { icon: Brain, label: 'Mixed Types' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-white/60">
                <Icon size={15} className="text-brand-400" />
                {label}
              </div>
            ))}
          </div>

          {/* Sections breakdown */}
          <div className="space-y-3 mb-8">
            {sections.map((s, i) => {
              const Icon = s.icon
              return (
                <div key={s.label} className="glass rounded-xl p-4 border border-white/[0.08] flex items-center gap-4 animate-in" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={17} className="text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{s.label}</p>
                    <p className="text-xs text-white/40">{s.desc}</p>
                  </div>
                  <span className="text-xs text-white/30 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/[0.06]">
                    ~{s.count}Q
                  </span>
                </div>
              )
            })}
          </div>

          <div className="glass rounded-2xl p-5 border border-amber-500/20 bg-amber-500/[0.05] mb-6 text-sm text-amber-200/70 animate-in delay-400">
            ⚠️ Once started, the timer cannot be paused. Ensure you are in a distraction-free environment before beginning.
          </div>

          <Link href="/assessment/test?type=non_it" className="btn-primary w-full justify-center py-3.5 text-base animate-in delay-500">
            Begin Non-IT Assessment
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  )
}
