'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Code2, Layers, Database, Brain, Globe, Server, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'
import Navbar from '@/components/layout/Navbar'

const domains = [
  { id: 'Frontend Developer', label: 'Frontend Developer', icon: Globe, color: 'from-blue-500 to-cyan-500', desc: 'UI/UX, React, HTML/CSS, JavaScript' },
  { id: 'Backend Developer', label: 'Backend Developer', icon: Server, color: 'from-emerald-500 to-teal-500', desc: 'APIs, Databases, Server logic, Security' },
  { id: 'Full Stack Developer', label: 'Full Stack Developer', icon: Layers, color: 'from-brand-500 to-purple-600', desc: 'Frontend + Backend, Architecture, Deployment' },
  { id: 'Data Science', label: 'Data Science', icon: Database, color: 'from-orange-500 to-amber-500', desc: 'Statistics, Pandas, ML basics, Visualization' },
  { id: 'AI/ML', label: 'AI/ML Engineer', icon: Brain, color: 'from-accent-500 to-pink-600', desc: 'Deep Learning, NLP, Model Training' },
]

const techMap: Record<string, string[]> = {
  'Frontend Developer': ['React', 'Node.js'],
  'Backend Developer': ['Python', 'Java', 'Node.js', '.NET', 'C', 'C++'],
  'Full Stack Developer': ['Python', 'Java', 'Node.js', '.NET'],
  'Data Science': ['Python'],
  'AI/ML': ['Python'],
}

export default function TechnicalTestPage() {
  const [selectedDomain, setSelectedDomain] = useState('')
  const [selectedTech, setSelectedTech] = useState('')
  const router = useRouter()

  const techs = selectedDomain ? techMap[selectedDomain] || [] : []

  const proceed = () => {
    if (!selectedDomain) { toast.error('Select a domain'); return }
    if (!selectedTech && techs.length > 0) { toast.error('Select a technology'); return }
    const params = new URLSearchParams({ domain: selectedDomain, technology: selectedTech })
    router.push(`/assessment/test?${params.toString()}`)
  }

  return (
    <div className="min-h-screen mesh-bg">
      <Navbar />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 animate-in">
            <div className="badge-brand mb-4 inline-flex">IT Track Confirmed ✓</div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">Select Your Domain</h1>
            <p className="text-white/50 text-sm">This just fine-tunes your test — pick whichever sounds most interesting, you can't get it "wrong"</p>
          </div>

          <div className="space-y-3 mb-8">
            {domains.map(d => {
              const Icon = d.icon
              const isSelected = selectedDomain === d.id
              return (
                <button key={d.id} onClick={() => { setSelectedDomain(d.id); setSelectedTech('') }}
                  className={`w-full glass rounded-2xl p-5 border text-left transition-all duration-200 flex items-center gap-4 ${
                    isSelected ? 'border-brand-500/50 bg-brand-500/10' : 'border-white/[0.08] hover:border-white/20'
                  }`}>
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${d.color} flex items-center justify-center flex-shrink-0 ${isSelected ? 'scale-110' : ''} transition-transform`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold ${isSelected ? 'text-white' : 'text-white/80'}`}>{d.label}</p>
                    <p className="text-xs text-white/40 mt-0.5">{d.desc}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 transition-all ${isSelected ? 'bg-brand-500 border-brand-500' : 'border-white/20'}`}>
                    {isSelected && <div className="w-full h-full rounded-full bg-white scale-50" />}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Technology selection */}
          {techs.length > 0 && (
            <div className="glass rounded-2xl p-6 border border-white/[0.08] mb-8 animate-in">
              <p className="text-sm font-semibold text-white mb-4">Select Technology / Language</p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {techs.map(t => (
                  <button key={t} onClick={() => setSelectedTech(t)}
                    className={`py-2.5 px-3 rounded-xl text-sm border transition-all font-medium ${
                      selectedTech === t ? 'bg-accent-500/20 border-accent-500/50 text-accent-200' : 'border-white/10 text-white/50 hover:border-white/20 hover:text-white/70'
                    }`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button onClick={proceed} disabled={!selectedDomain}
            className="btn-primary w-full justify-center py-3.5 text-base disabled:opacity-40">
            Start Technical Assessment
            <ArrowRight size={18} />
          </button>

          <button
            onClick={() => router.push(`/assessment/test?${new URLSearchParams({ domain: 'Full Stack Developer', technology: 'None / Not Sure' }).toString()}`)}
            className="w-full text-center text-sm text-white/40 hover:text-white/60 mt-4 underline underline-offset-4"
          >
            Not sure? Skip this — start with a general Full Stack assessment instead
          </button>
        </div>
      </div>
    </div>
  )
}
