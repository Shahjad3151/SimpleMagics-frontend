import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Map, ArrowRight, CalendarDays, IndianRupee, Target } from 'lucide-react'

const points = [
  { icon: CalendarDays, title: '90 days, week by week', desc: 'Not "learn to code" — specific weekly milestones for your matched career track.' },
  { icon: IndianRupee, title: 'Salary ranges included', desc: 'Know what the role typically pays at entry, mid, and senior level before you commit.' },
  { icon: Target, title: 'Tied to your top 3 matches', desc: 'A roadmap for each of your top career matches, not a generic industry overview.' },
]

export default function CareerRoadmapsPage() {
  return (
    <main className="mesh-bg min-h-screen">
      <Navbar />
      <section className="pt-36 pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl bg-brand-500/15 flex items-center justify-center mx-auto mb-5">
            <Map size={26} className="text-brand-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Career <span className="gradient-text">roadmaps</span>
          </h1>
          <p className="text-white/50 max-w-xl mx-auto leading-relaxed mb-10">
            Your 90-day roadmap is generated as part of your career blueprint after you complete an assessment — no separate booking needed.
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
            Start your assessment <ArrowRight size={18} />
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  )
}
