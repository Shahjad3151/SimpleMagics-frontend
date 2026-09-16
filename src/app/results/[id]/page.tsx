'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import {
  CheckCircle2, XCircle, AlertTriangle, TrendingUp, ArrowRight,
  Award, Target, Zap, BookOpen, LayoutDashboard, RotateCcw,
  Star, Brain, Lightbulb, MapPin, Clock, ChevronRight, Sparkles
} from 'lucide-react'
import { resultApi } from '@/lib/api'
import Navbar from '@/components/layout/Navbar'

interface SectionScore { obtained: number; max: number; percentage: number }

interface Result {
  id: number; percentage: number; category_fit: string; domain_fit: string
  technology_fit: string; eligibility_status: string; strengths: string[]
  weaknesses: string[]; recommendations: string[]; learning_path: string[]
  total_score: number; max_score: number; section_scores: Record<string, SectionScore>
  category_signal_breakdown?: Record<string, number>
}

const statusConfig = {
  exceptional:         { icon: Star,          color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/30', label: '⭐ Exceptional', badge: 'badge-yellow' },
  eligible:            { icon: CheckCircle2,  color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30', label: '✅ Career Ready', badge: 'badge-green' },
  moderately_eligible: { icon: AlertTriangle, color: 'text-amber-400',   bg: 'bg-amber-500/10 border-amber-500/30',   label: '⚡ Good Foundation', badge: 'badge-amber' },
  needs_improvement:   { icon: TrendingUp,    color: 'text-blue-400',    bg: 'bg-blue-500/10 border-blue-500/30',      label: '🌱 Keep Growing',   badge: 'badge-blue' },
}

const catGradients: Record<string, string> = {
  IT: 'from-indigo-500 to-violet-600',
  Management: 'from-emerald-500 to-teal-600',
  'Non-IT': 'from-amber-500 to-orange-600',
  Finance: 'from-green-500 to-emerald-600',
  HR: 'from-pink-500 to-rose-600',
  Creative: 'from-purple-500 to-pink-600',
  Engineering: 'from-slate-500 to-gray-600',
}

const CAREER_PATHS: Record<string, any[]> = {
  IT: [
    { name: 'Software Developer', icon: '💻', match: 94, salary: '₹4L–₹30L+/yr', timeline: '4–8 months to job',
      skills: ['Python/JavaScript', 'React/Node.js', 'DSA', 'System Design', 'Git'],
      roadmap: ['Week 1-2: Pick Python or JS, complete crash course', 'Month 1: Build 3 mini projects', 'Month 2: Learn framework + databases', 'Month 3: Full-stack project + GitHub portfolio', 'Month 4: Apply to 20+ jobs/week'] },
    { name: 'Data Scientist', icon: '📊', match: 87, salary: '₹5L–₹25L+/yr', timeline: '6–10 months',
      skills: ['Python', 'SQL', 'Machine Learning', 'Statistics', 'Tableau'],
      roadmap: ['Month 1: Python + SQL fundamentals', 'Month 2: Pandas, NumPy, visualization', 'Month 3: ML algorithms + scikit-learn', 'Month 4: Kaggle competitions + portfolio'] },
    { name: 'Cloud/DevOps Engineer', icon: '☁️', match: 80, salary: '₹6L–₹28L+/yr', timeline: '8–12 months',
      skills: ['AWS/Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Linux'],
      roadmap: ['Month 1: Linux CLI + networking basics', 'Month 2: AWS core services (free tier)', 'Month 3: Docker + CI/CD pipelines', 'Month 4: AWS Solutions Architect certification'] },
  ],
  Management: [
    { name: 'Business Analyst', icon: '📈', match: 92, salary: '₹4L–₹20L+/yr', timeline: '3–6 months',
      skills: ['Requirements Analysis', 'SQL', 'Excel', 'Agile', 'Stakeholder Management'],
      roadmap: ['Week 1-2: Learn BPMN + process mapping tools', 'Month 1: SQL + Excel power user skills', 'Month 2: Agile/Scrum certification (free)', 'Month 3: Create 2 case studies + apply'] },
    { name: 'Product Manager', icon: '🎯', match: 84, salary: '₹8L–₹40L+/yr', timeline: '6–12 months',
      skills: ['Product Strategy', 'User Research', 'OKRs', 'Roadmapping', 'Analytics'],
      roadmap: ['Month 1: Read "Inspired" + study successful products', 'Month 2: Conduct 10 user interviews', 'Month 3: Write PRDs, get APM internship or role'] },
    { name: 'Entrepreneur', icon: '🚀', match: 78, salary: 'Unlimited', timeline: 'Start this week',
      skills: ['Problem Discovery', 'Customer Development', 'Financial Modeling', 'GTM', 'Team Building'],
      roadmap: ['Week 1: List 3 real problems you have personally', 'Month 1: Talk to 20 potential customers', 'Month 2: Build MVP (can be a landing page)', 'Month 3: Launch + get first 10 customers'] },
  ],
  'Non-IT': [
    { name: 'Digital Marketing Executive', icon: '📢', match: 90, salary: '₹3L–₹15L+/yr', timeline: '3–5 months',
      skills: ['SEO/SEM', 'Google Analytics', 'Social Media', 'Content Strategy', 'Email Marketing'],
      roadmap: ['Month 1: Google Digital Marketing Certificate (free)', 'Month 2: Run ₹1,000 test campaign, document results', 'Month 3: Apply — show actual campaign performance'] },
    { name: 'Sales & Business Development', icon: '🤝', match: 85, salary: '₹3L–₹20L+ + commissions', timeline: '1–2 months',
      skills: ['Consultative Selling', 'CRM', 'Negotiation', 'Cold Outreach', 'Objection Handling'],
      roadmap: ['Week 1-2: Read "The Challenger Sale"', 'Month 1: Start selling anything — freelance or part-time', 'Month 2: Apply to inside sales / BDE roles — they train freshers'] },
  ],
  Finance: [
    { name: 'Chartered Accountant (CA)', icon: '💰', match: 93, salary: '₹7L–₹50L+/yr', timeline: '3–4 years (high ROI)',
      skills: ['Financial Reporting', 'Taxation', 'Audit', 'GST', 'Companies Act'],
      roadmap: ['Now: Register for CA Foundation at icai.org', 'Month 1-4: Study 4 subjects intensively', 'Attempt exam: pass → CA Intermediate path is secured', 'Final: 3 years articleship → CA Final → highest-paying career'] },
    { name: 'Financial Analyst', icon: '📊', match: 85, salary: '₹5L–₹25L+/yr', timeline: '6–10 months',
      skills: ['Financial Modeling', 'Excel', 'Valuation', 'CFA Concepts', 'Bloomberg'],
      roadmap: ['Month 1: Excel financial modeling (free YouTube + templates)', 'Month 2: Study equity research and DCF valuation', 'Month 3: CFA Level 1 prep + create 3 equity research reports'] },
  ],
  HR: [
    { name: 'HR Business Partner', icon: '👥', match: 91, salary: '₹4L–₹18L+/yr', timeline: '3–5 months',
      skills: ['Recruitment', 'HRIS', 'Labour Law', 'L&D', 'Performance Management'],
      roadmap: ['Month 1: Free HR certification (SHRM fundamentals)', 'Month 2: Master Zoho Recruit or Keka HRIS', 'Month 3: Apply for HR Executive / Generalist roles'] },
    { name: 'Talent Acquisition Specialist', icon: '🔍', match: 86, salary: '₹3L–₹15L+/yr', timeline: '2–3 months',
      skills: ['Boolean Search', 'LinkedIn Recruiter', 'Interviewing', 'ATS Tools', 'Salary Negotiation'],
      roadmap: ['Month 1: LinkedIn Recruiter free trial + source 50 profiles', 'Month 2: Practice screening + join HR communities on Slack', 'Month 3: Recruitment agencies train freshers — apply now'] },
  ],
  Creative: [
    { name: 'UI/UX Designer', icon: '🎨', match: 93, salary: '₹4L–₹22L+/yr', timeline: '4–7 months',
      skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'Usability Testing'],
      roadmap: ['Week 1-2: Figma fundamentals (free course)', 'Month 1: Redesign 3 apps you use daily', 'Month 2: Conduct 5 user interviews per redesign', 'Month 3: Apply to junior UX roles or start freelancing on Upwork'] },
    { name: 'Social Media Manager/Influencer', icon: '📱', match: 87, salary: '₹3L–₹20L+ + brand deals', timeline: '3–6 months',
      skills: ['Content Strategy', 'Video Editing', 'Copywriting', 'Analytics', 'Brand Partnerships'],
      roadmap: ['Month 1: Choose 1 platform + niche, post daily', 'Month 2: Study top creators, A/B test content formats', 'Month 3: Pitch to 10 small brands for collaborations'] },
  ],
}

function getCareerPaths(catFit: string) {
  return CAREER_PATHS[catFit] || CAREER_PATHS['Non-IT']
}

export default function ResultPage() {
  const params = useParams()
  const [result, setResult] = useState<Result | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (params.id) {
      resultApi.getResult(Number(params.id))
        .then(setResult)
        .catch(() => router.push('/dashboard'))
        .finally(() => setLoading(false))
    }
  }, [params.id])

  if (loading) return (
    <div className="min-h-screen mesh-bg flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-brand-500/30 border-t-brand-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white/40 text-sm">Analyzing your results...</p>
      </div>
    </div>
  )

  if (!result) return null

  const isProfileResult = !result.eligibility_status
  const pct = Math.round(result.percentage)
  const status = result.eligibility_status ? statusConfig[result.eligibility_status as keyof typeof statusConfig] : null
  const StatusIcon = status?.icon || CheckCircle2
  const scoreColor = pct >= 75 ? 'text-emerald-400' : pct >= 50 ? 'text-amber-400' : 'text-red-400'
  const catColor = result.category_fit ? (catGradients[result.category_fit] || catGradients.IT) : catGradients.IT
  const careerPaths = getCareerPaths(result.category_fit || 'Non-IT')
  const sections = Object.entries(result.section_scores || {})

  return (
    <div className="min-h-screen mesh-bg">
      <Navbar />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto space-y-6">

          {/* Hero Score Card */}
          <div className="glass rounded-3xl p-8 border border-white/[0.08] relative overflow-hidden animate-in">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-accent-500/5" />
            <div className="relative text-center">
              <div className="inline-flex flex-col items-center justify-center w-36 h-36 rounded-full mb-6 relative mx-auto">
                <svg viewBox="0 0 140 140" className="absolute inset-0 w-full h-full -rotate-90">
                  <circle cx="70" cy="70" r="60" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8"/>
                  <circle cx="70" cy="70" r="60" fill="none"
                    stroke={pct >= 75 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#ef4444'}
                    strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 60}`}
                    strokeDashoffset={`${2 * Math.PI * 60 * (1 - pct / 100)}`}
                    style={{ transition: 'stroke-dashoffset 1.5s ease' }}
                  />
                </svg>
                <div className="relative z-10">
                  <p className={`text-4xl font-display font-black ${scoreColor}`}>{pct}%</p>
                  <p className="text-xs text-white/40">{result.total_score}/{result.max_score} pts</p>
                </div>
              </div>

              <h1 className="text-3xl font-display font-bold text-white mb-2">
                {isProfileResult ? 'Profile Intelligence Complete!' : 'Domain Assessment Complete!'}
              </h1>

              <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                {result.category_fit && (
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r ${catColor} text-white`}>
                    <Zap size={13} /> {result.category_fit} Track
                  </span>
                )}
                {status && (
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border ${status.bg} ${status.color}`}>
                    <StatusIcon size={14} /> {status.label}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Why this recommendation — transparency, not a black box */}
          {isProfileResult && result.category_signal_breakdown && Object.keys(result.category_signal_breakdown).length > 0 && (
            <div className="glass rounded-2xl p-6 border border-white/[0.08] animate-in delay-100">
              <h3 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
                <Lightbulb size={16} className="text-amber-400" /> Why we recommended {result.category_fit}
              </h3>
              <p className="text-xs text-white/40 mb-4">
                This came from how you answered everyday questions about what energizes you and how you naturally work — not from a pass/fail score.
              </p>
              <div className="grid gap-2.5">
                {Object.entries(result.category_signal_breakdown)
                  .sort(([, a], [, b]) => b - a)
                  .map(([cat, votes]) => {
                    const total = Object.values(result.category_signal_breakdown!).reduce((a, b) => a + b, 0)
                    const p = total ? Math.round((votes / total) * 100) : 0
                    return (
                      <div key={cat} className="flex items-center gap-3">
                        <span className={`text-sm w-28 flex-shrink-0 truncate ${cat === result.category_fit ? 'text-white font-semibold' : 'text-white/50'}`}>{cat}</span>
                        <div className="flex-1 h-2 bg-white/[0.06] rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500" style={{ width: `${p}%` }} />
                        </div>
                        <span className="text-xs text-white/40 w-10 text-right">{votes}x</span>
                      </div>
                    )
                  })}
              </div>
            </div>
          )}

          {/* Aptitude readiness — kept separate from career-track fit on purpose */}
          {isProfileResult && status && (
            <div className={`glass rounded-2xl p-5 border ${status.bg} flex items-start gap-3 animate-in delay-150`}>
              <StatusIcon size={20} className={`${status.color} flex-shrink-0 mt-0.5`} />
              <div>
                <p className={`text-sm font-bold ${status.color}`}>{status.label} — reasoning fundamentals</p>
                <p className="text-xs text-white/50 mt-1">
                  This score reflects your logical, quantitative, and verbal reasoning — it's about how sharp your fundamentals are right now, not whether {result.category_fit} is the "right" choice. Both can be improved with practice regardless of your track.
                </p>
              </div>
            </div>
          )}

          {/* Section Scores */}
          {sections.length > 0 && (
            <div className="glass rounded-2xl p-6 border border-white/[0.08] animate-in delay-100">
              <h3 className="text-base font-semibold text-white mb-5 flex items-center gap-2">
                <Brain size={16} className="text-brand-400" /> Section-wise Performance
              </h3>
              <div className="grid gap-3">
                {sections.map(([sec, data]) => {
                  const p = data.percentage || 0
                  const barColor = p >= 75 ? '#10b981' : p >= 50 ? '#f59e0b' : '#ef4444'
                  return (
                    <div key={sec} className="flex items-center gap-3">
                      <span className="text-sm text-white/60 w-40 flex-shrink-0 truncate">{sec}</span>
                      <div className="flex-1 h-2 bg-white/[0.06] rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-1000"
                          style={{ width: `${p}%`, backgroundColor: barColor }} />
                      </div>
                      <span className="text-sm font-bold w-12 text-right" style={{ color: barColor }}>{p}%</span>
                      <span className="text-base">{p >= 75 ? '🌟' : p >= 50 ? '✅' : '📚'}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in delay-200">
            {result.strengths?.length > 0 && (
              <div className="glass rounded-2xl p-5 border border-emerald-500/20">
                <h3 className="text-sm font-bold text-emerald-400 mb-4 flex items-center gap-2">
                  <Award size={14} /> Your Strengths
                </h3>
                <ul className="space-y-2">
                  {result.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                      <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {result.weaknesses?.length > 0 && (
              <div className="glass rounded-2xl p-5 border border-amber-500/20">
                <h3 className="text-sm font-bold text-amber-400 mb-4 flex items-center gap-2">
                  <Target size={14} /> Areas to Improve
                </h3>
                <ul className="space-y-2">
                  {result.weaknesses.map((w, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                      <TrendingUp size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Career Paths */}
          <div className="animate-in delay-300">
            <h2 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
              <Sparkles size={18} className="text-brand-400" />
              Your Top Career Matches
            </h2>
            <div className="space-y-4">
              {careerPaths.map((path, i) => (
                <div key={path.name} className={`glass rounded-2xl p-6 border ${i === 0 ? 'border-brand-500/30' : 'border-white/[0.08]'} transition-all hover:border-white/20`}>
                  {i === 0 && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/15 text-brand-400 text-xs font-bold mb-3 border border-brand-500/25">
                      <Star size={10} /> Best Match
                    </div>
                  )}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-3xl">{path.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white">{path.name}</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <span className="text-xs text-emerald-400 font-semibold">{path.match}% match</span>
                        <span className="text-xs text-white/40">·</span>
                        <span className="text-xs text-white/50">{path.salary}</span>
                        <span className="text-xs text-white/40">·</span>
                        <span className="text-xs text-amber-400">{path.timeline}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {path.skills.map((s: string) => (
                      <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-white/[0.06] text-white/50 border border-white/[0.08]">{s}</span>
                    ))}
                  </div>

                  <div>
                    <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Your 90-Day Roadmap</p>
                    <div className="space-y-2">
                      {path.roadmap.map((step: string, j: number) => (
                        <div key={j} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-0.5">{j+1}</div>
                          <p className="text-sm text-white/60 leading-relaxed">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Path */}
          {result.learning_path?.length > 0 && (
            <div className="glass rounded-2xl p-6 border border-white/[0.08] animate-in delay-400">
              <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                <BookOpen size={16} className="text-accent-400" /> Personalized Learning Path
              </h3>
              <div className="space-y-3">
                {result.learning_path.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-accent-500/15 border border-accent-500/25 flex items-center justify-center text-xs font-bold text-accent-400 flex-shrink-0">{i+1}</div>
                    <p className="text-sm text-white/70 leading-relaxed pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="glass rounded-2xl p-6 border border-white/[0.08] text-center animate-in delay-500">
            <p className="text-white/50 text-sm mb-4">
              {isProfileResult ? 'Ready to go deeper? Take your domain-specific assessment next.' : 'Chat with our AI career counselor for personalized guidance.'}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {isProfileResult && (
                <Link href={`/assessment/test?type=${result.category_fit === 'IT' ? 'it_technical' : result.category_fit === 'Management' ? 'management' : 'non_it'}`}
                  className="btn-primary px-6 py-2.5 text-sm">
                  Take Domain Test <ArrowRight size={15} />
                </Link>
              )}
              <Link href="/dashboard" className="btn-secondary px-6 py-2.5 text-sm">
                <LayoutDashboard size={15} /> My Dashboard
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
