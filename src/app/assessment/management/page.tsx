'use client'
import Link from 'next/link'
import { ArrowRight, Users, TrendingUp, MessageSquare, Target, Clock, FileText, Lightbulb } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'

const sections = [
  { icon: MessageSquare, label: 'Communication & Leadership', desc: 'Evaluate how you lead, communicate, and inspire teams', count: 3 },
  { icon: Target, label: 'Decision Making', desc: 'Business case scenarios requiring strategic thinking', count: 2 },
  { icon: TrendingUp, label: 'Business Understanding', desc: 'Market awareness, organizational behavior, and strategy', count: 2 },
  { icon: Users, label: 'Team & People Management', desc: 'Conflict resolution, delegation, and team dynamics', count: 2 },
  { icon: Lightbulb, label: 'Problem Solving & Prioritization', desc: 'Logical approach to complex business problems', count: 1 },
]

export default function ManagementTestPage() {
  return (
    <div className="min-h-screen mesh-bg">
      <Navbar />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10 animate-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-500/15 border border-accent-500/25 text-accent-300 text-sm font-medium mb-4">
              🏆 Management Track Confirmed
            </div>
            <h1 className="text-3xl font-display font-bold text-white mb-3">Management Assessment</h1>
            <p className="text-white/50 text-sm leading-relaxed">
              This assessment evaluates your leadership, decision-making, business acumen, and people management capabilities — the pillars of management excellence.
            </p>
          </div>

          {/* Info bar */}
          <div className="glass rounded-2xl p-5 border border-white/[0.08] mb-6 flex flex-wrap gap-5 justify-center animate-in delay-100">
            {[
              { icon: FileText, label: '10 Questions' },
              { icon: Clock, label: '30 Minutes' },
              { icon: Users, label: 'Situational + MCQ' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-white/60">
                <Icon size={15} className="text-accent-400" />
                {label}
              </div>
            ))}
          </div>

          {/* Sections */}
          <div className="space-y-3 mb-8">
            {sections.map((s, i) => {
              const Icon = s.icon
              return (
                <div key={s.label} className="glass rounded-xl p-4 border border-white/[0.08] flex items-center gap-4 animate-in" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="w-10 h-10 rounded-xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={17} className="text-accent-400" />
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

          <div className="glass rounded-2xl p-5 border border-brand-500/20 bg-brand-500/[0.05] mb-6 text-sm text-brand-200/70 animate-in delay-400">
            💡 There are no strictly right or wrong answers for management — your responses reveal your leadership style and business reasoning.
          </div>

          <Link href="/assessment/test?type=management" className="btn-accent w-full justify-center py-3.5 text-base animate-in delay-500">
            Begin Management Assessment
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  )
}
