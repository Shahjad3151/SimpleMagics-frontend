import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Sparkles, ArrowRight, Code2, TrendingUp, BookOpen } from 'lucide-react'

const points = [
  { icon: Code2, title: 'Gap-based, not generic', desc: 'Recommendations come from what your assessment showed you\u2019re missing — not a one-size-fits-all course list.' },
  { icon: TrendingUp, title: 'Ranked by impact', desc: 'We prioritize the 2\u20133 skills that move your career match the most, not everything at once.' },
  { icon: BookOpen, title: 'Specific, not vague', desc: 'Exact course or resource, not "take a course on X." Comes bundled into your 90-day roadmap.' },
]

export default function SkillRecommendationsPage() {
  return (
    <main className="mesh-bg min-h-screen">
      <Navbar />
      <section className="pt-36 pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl bg-brand-500/15 flex items-center justify-center mx-auto mb-5">
            <Sparkles size={26} className="text-brand-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Skill <span className="gradient-text">recommendations</span>
          </h1>
          <p className="text-white/50 max-w-xl mx-auto leading-relaxed mb-10">
            Skill recommendations are generated automatically once you complete a domain assessment — they're built into your career blueprint, not a separate step.
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
            Start an assessment to get yours <ArrowRight size={18} />
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  )
}
