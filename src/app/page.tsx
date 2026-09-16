import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import {
  ArrowRight, Zap, Code2, Brain, Briefcase, CheckCircle2,
  Award, Clock, TrendingUp, Star, BarChart3, Target,
  Layers, Shield, Users, Sparkles, Heart, Globe
} from 'lucide-react'

const categories = [
  {
    icon: Code2, label: 'IT & Technology', color: 'from-brand-500 to-brand-700', glow: 'shadow-brand-900/40',
    href: '/assessment/technical',
    questions: 30, duration: '50 min',
    domains: ['Software Dev', 'AI/ML', 'Cloud', 'Cybersecurity', 'Mobile', 'Data Science'],
    careers: ['Software Developer', 'Data Scientist', 'DevOps Engineer', 'AI/ML Engineer'],
    desc: 'For builders, coders, and tech innovators. 30 hard technical questions reveal your actual engineering thinking.'
  },
  {
    icon: Briefcase, label: 'Business & Management', color: 'from-emerald-500 to-teal-600', glow: 'shadow-emerald-900/30',
    href: '/assessment/management',
    questions: 25, duration: '45 min',
    domains: ['Business Analyst', 'Product Manager', 'Entrepreneur', 'Consultant', 'Operations'],
    careers: ['Business Analyst', 'Product Manager', 'Entrepreneur', 'Consultant'],
    desc: 'For strategic thinkers and future leaders. Tests real business judgment, financial literacy, and leadership instincts.'
  },
  {
    icon: Brain, label: 'Finance & CA', color: 'from-green-500 to-emerald-600', glow: 'shadow-green-900/30',
    href: '/assessment/finance',
    questions: 15, duration: '45 min',
    domains: ['CA', 'Financial Analyst', 'Investment Banking', 'Tax', 'Audit'],
    careers: ['Chartered Accountant', 'Financial Analyst', 'Investment Banker', 'Tax Consultant'],
    desc: 'For number-focused professionals. Tests accounting standards, financial ratios, taxation, and business valuation.'
  },
  {
    icon: Users, label: 'HR & Talent', color: 'from-pink-500 to-rose-600', glow: 'shadow-pink-900/30',
    href: '/assessment/hr',
    questions: 15, duration: '35 min',
    domains: ['Talent Acquisition', 'HR Business Partner', 'L&D', 'Compensation', 'Culture'],
    careers: ['HR Business Partner', 'Talent Acquisition', 'L&D Specialist', 'HR Analyst'],
    desc: 'For people champions. Tests recruitment strategy, employee relations, HR analytics, and DEI practices.'
  },
  {
    icon: Sparkles, label: 'Creative & Social Media', color: 'from-purple-500 to-pink-600', glow: 'shadow-purple-900/30',
    href: '/assessment/creative',
    questions: 15, duration: '35 min',
    domains: ['UI/UX Design', 'Social Media', 'Content Creator', 'Digital Marketing', 'Branding'],
    careers: ['UI/UX Designer', 'Social Media Manager', 'Content Strategist', 'Digital Marketer'],
    desc: 'For creative minds and digital natives. Tests content strategy, platform algorithms, analytics, and brand thinking.'
  },
  {
    icon: Globe, label: 'Non-IT Professional', color: 'from-amber-500 to-orange-600', glow: 'shadow-amber-900/30',
    href: '/assessment/non-it',
    questions: 25, duration: '40 min',
    domains: ['Aptitude', 'Reasoning', 'Communication', 'Sales', 'Operations', 'Teaching'],
    careers: ['Sales Executive', 'Operations Manager', 'Digital Marketer', 'Teacher'],
    desc: 'For all-rounders. 25 hard aptitude, reasoning, and professional skills questions that any employer values.'
  },
]

const steps = [
  { step: '01', title: 'Tell Us About You', desc: 'Quick 2-minute profile: your education, current situation, what excites you, and your biggest career challenge.' },
  { step: '02', title: 'Profile Intelligence Test', desc: '25 smart questions — logic puzzles, business scenarios, aptitude, and personality questions to map your career DNA.' },
  { step: '03', title: 'AI Career Classification', desc: 'Our AI maps you to the best-fit domain based on your thinking style, score pattern, and stated interests.' },
  { step: '04', title: 'Deep Domain Assessment', desc: '30 hard, real-world questions in your domain. Not textbook — these are the questions top companies actually ask.' },
  { step: '05', title: 'Your Career Blueprint', desc: 'A comprehensive report: section scores, top 3 career matches, 90-day action plan, salary ranges, and AI career counseling.' },
]

const benefits = [
  { icon: Target, title: 'Covers 50+ Career Tracks', desc: 'IT, Finance, HR, Creative, Law, Healthcare, Government, Manufacturing — no career is left out.' },
  { icon: BarChart3, title: 'Section-Wise Analysis', desc: 'Know exactly where you\'re strong and weak — not just a single score but a full cognitive breakdown.' },
  { icon: TrendingUp, title: '90-Day Action Roadmaps', desc: 'Specific, week-by-week plans for each career match. Not "take a course" — exactly which course and why.' },
  { icon: Shield, title: 'For Everyone', desc: 'Students, freshers, career-breakers, homemakers re-entering workforce, dropouts — this platform has no prerequisites.' },
  { icon: Clock, title: 'Real Difficulty Level', desc: 'Hard questions with explanations. Tests don\'t lie — you\'ll know exactly where you stand vs. industry standards.' },
  { icon: Heart, title: 'Free Expert Counseling', desc: 'Beyond the AI counselor, get a free session with a real career counselor who reviews your results with you.' },
]

const stats = [
  { value: '50+', label: 'Career Tracks' },
  { value: '150+', label: 'Hard Questions' },
  { value: '6', label: 'Test Categories' },
  { value: 'AI', label: 'Powered Guidance' },
]

const whoItHelps = [
  { emoji: '🎓', label: 'College Students', desc: 'Confused about placements or post-grad career?' },
  { emoji: '🌱', label: 'Fresh Graduates', desc: 'Don\'t know where to apply or what you\'re worth?' },
  { emoji: '💼', label: 'Working Professionals', desc: 'Doing fine, but wondering if there\'s a better-fit track?' },
  { emoji: '🔀', label: 'Career Switchers', desc: 'Want to change fields but don\'t know how?' },
  { emoji: '🔍', label: 'Job Seekers', desc: 'Actively applying and need direction, not more noise?' },
  { emoji: '⏸️', label: 'Career Breakers', desc: 'Returning after a gap and need to restart?' },
  { emoji: '🏡', label: 'Homemakers', desc: 'Ready to rebuild your professional identity?' },
  { emoji: '💡', label: 'Aspiring Entrepreneurs', desc: 'Want to start something but need clarity?' },
  { emoji: '📚', label: 'Dropouts', desc: 'No degree? No problem. Skills pay the bills.' },
  { emoji: '🚀', label: 'Anyone Lost', desc: 'Just need a direction? Start here.' },
]

export default function HomePage() {
  return (
    <main className="mesh-bg min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-36 pb-24 px-4 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 badge-brand mb-6 animate-in">
            <Star size={12} className="text-brand-400" />
            AI-Powered · 50+ Career Tracks · One Platform for Every Person
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-6 animate-in delay-100">
            Your Career Clarity<br /><span className="gradient-text">Starts Here</span>
          </h1>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-4 leading-relaxed animate-in delay-200">
            Whether you're a student, a career-break person, or simply lost — this platform asks the right questions, reveals your true strengths, and gives you a <strong className="text-white/70">step-by-step roadmap</strong> to build the career you deserve.
          </p>
          <p className="text-sm text-brand-400 font-semibold mb-10 animate-in delay-250">
            No prerequisites. No judgment. Just clarity.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-in delay-300">
            <Link href="/auth/register" className="btn-primary text-base px-8 py-3.5">
              Start Free — Get Your Career Blueprint <ArrowRight size={18} />
            </Link>
            <Link href="#who" className="btn-secondary text-base px-8 py-3.5">
              Is This For Me?
            </Link>
          </div>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto animate-in delay-400">
            {stats.map(s => (
              <div key={s.label} className="glass rounded-2xl py-4 px-3 text-center">
                <p className="text-2xl font-display font-bold gradient-text">{s.value}</p>
                <p className="text-xs text-white/40 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT HELPS */}
      <section id="who" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs text-amber-400 font-semibold uppercase tracking-widest mb-3">Who This Is For</p>
            <h2 className="section-title">For Every Person at Every<br /><span className="gradient-text">Stage of Their Journey</span></h2>
            <p className="text-white/50 text-sm mt-4 max-w-xl mx-auto">This isn't just for toppers. It's the one platform that gives guidance to everyone — no matter where you're starting from.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {whoItHelps.map(w => (
              <div key={w.label} className="glass rounded-2xl p-4 border border-white/[0.06] hover:border-brand-500/20 transition-all hover:-translate-y-1 duration-300">
                <div className="text-2xl mb-3">{w.emoji}</div>
                <div className="font-semibold text-white text-sm mb-1">{w.label}</div>
                <div className="text-xs text-white/40 leading-relaxed">{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs text-brand-400 font-semibold uppercase tracking-widest mb-3">Assessment Tracks</p>
            <h2 className="section-title">6 Deep Assessment Tracks,<br /><span className="gradient-text">50+ Career Paths</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <Link key={cat.label} href={cat.href} className="card group hover:border-white/20 hover:-translate-y-2 transition-all duration-300 block cursor-pointer relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`} />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-lg ${cat.glow} group-hover:scale-110 transition-transform`}>
                        <Icon size={22} className="text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-white/40">{cat.questions} questions</div>
                        <div className="text-xs text-white/30">{cat.duration}</div>
                      </div>
                    </div>
                    <h3 className="text-lg font-display font-bold text-white mb-2">{cat.label}</h3>
                    <p className="text-sm text-white/50 leading-relaxed mb-4">{cat.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {cat.domains.map(d => (
                        <span key={d} className="text-xs px-2.5 py-1 rounded-full bg-white/[0.06] text-white/50 border border-white/[0.08]">{d}</span>
                      ))}
                    </div>
                    <div className="pt-3 border-t border-white/[0.06]">
                      <p className="text-xs text-white/30 mb-2">Career paths unlocked:</p>
                      <div className="flex flex-wrap gap-1">
                        {cat.careers.map((c: string) => (
                          <span key={c} className="text-xs px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20">{c}</span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-brand-400 group-hover:gap-3 transition-all">
                      Start this assessment <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs text-accent-400 font-semibold uppercase tracking-widest mb-3">Process</p>
            <h2 className="section-title">From Confusion<br /><span className="gradient-text">to Career Clarity</span></h2>
            <p className="text-white/40 text-sm mt-3">Takes about 60-75 minutes. Worth every second.</p>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute left-[1.75rem] top-6 bottom-6 w-px bg-gradient-to-b from-brand-500/50 via-accent-500/30 to-transparent" />
            <div className="space-y-5">
              {steps.map((step, i) => (
                <div key={step.step} className="flex gap-5 items-start group animate-in" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl glass border border-white/10 group-hover:border-brand-500/40 flex items-center justify-center text-lg font-display font-bold gradient-text transition-all">
                    {step.step}
                  </div>
                  <div className="glass rounded-2xl p-5 flex-1 group-hover:border-brand-500/20 transition-all">
                    <h4 className="font-semibold text-white mb-1.5">{step.title}</h4>
                    <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section id="benefits" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs text-emerald-400 font-semibold uppercase tracking-widest mb-3">Why CareerCompass</p>
            <h2 className="section-title">Not Just an Assessment —<br /><span className="gradient-text">A Complete Solution</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => {
              const Icon = b.icon
              return (
                <div key={b.title} className="glass rounded-2xl p-6 hover:border-brand-500/20 transition-all group animate-in" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-4 group-hover:bg-brand-500/20 transition-colors">
                    <Icon size={18} className="text-brand-400" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">{b.title}</h4>
                  <p className="text-sm text-white/50 leading-relaxed">{b.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass rounded-3xl p-12 border border-brand-500/20 glow-brand relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-accent-500/5" />
            <div className="relative">
              <div className="text-5xl mb-6">🧭</div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                Your Career Doesn't Have to Be a Guess
              </h2>
              <p className="text-white/50 mb-3">
                Stop wondering. Stop comparing yourself to others. Take 60 minutes today and get complete clarity on where you should go and exactly how to get there.
              </p>
              <p className="text-sm text-brand-400 font-semibold mb-8">Free. No credit card. No catch.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/auth/register" className="btn-primary px-8 py-3.5">
                  Get My Career Blueprint <ArrowRight size={18} />
                </Link>
                <Link href="/auth/login" className="btn-secondary px-8 py-3.5">
                  Already have an account?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}