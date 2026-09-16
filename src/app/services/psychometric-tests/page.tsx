import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Brain, ArrowRight, ClipboardCheck, LayoutGrid, Gauge } from 'lucide-react'

const points = [
  { icon: ClipboardCheck, title: '150+ questions', desc: 'Across 7 categories — Profile Intelligence, IT, Management, Non-IT, HR, Finance, and Creative.' },
  { icon: LayoutGrid, title: 'Real difficulty', desc: 'Weighted toward hard and expert-level questions — the kind top companies actually ask.' },
  { icon: Gauge, title: 'Full cognitive profile', desc: 'Section-wise breakdown across 10+ thinking dimensions, not just one score.' },
]

export default function PsychometricTestsPage() {
  return (
    <main className="mesh-bg min-h-screen">
      <Navbar />
      <section className="pt-36 pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl bg-brand-500/15 flex items-center justify-center mx-auto mb-5">
            <Brain size={26} className="text-brand-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Psychometric <span className="gradient-text">tests</span>
          </h1>
          <p className="text-white/50 max-w-xl mx-auto leading-relaxed mb-10">
            Our psychometric testing starts with a 25-question Profile Intelligence assessment, then routes you into a 15\u201330 question deep-dive matched to your best-fit domain.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-12 text-left">
            {points.map(p => (
              <div key={p.title} className="card">
                <p.icon size={20} className="text-brand-300 mb-3" />
                <p className="text-sm font-semibold text-white mb-1">{p.title}</p>
                <p className="text-xs text-white/50">{p.desc}</p>
              </div>
            ))}
          </div>

          <Link href="/assessment/profile" className="btn-primary text-base px-8 py-3.5">
            Take the Profile Intelligence test <ArrowRight size={18} />
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  )
}
