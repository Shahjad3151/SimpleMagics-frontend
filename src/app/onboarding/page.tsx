'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, Phone, GraduationCap, Building2, Calendar, ArrowRight, Check } from 'lucide-react'
import toast from 'react-hot-toast'
import { studentApi } from '@/lib/api'
import Navbar from '@/components/layout/Navbar'

const educations = ['10th / SSC', '12th / HSC', 'Diploma', 'B.E / B.Tech', 'B.Sc', 'BCA', 'MBA', 'MCA', 'M.Tech', 'Other']
const statuses = ['Student', 'Fresher', 'Working Professional', 'Career Changer', 'Job Seeker']

const steps = ['Personal Info', 'Academic Details', "What's Next"]

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [form, setForm] = useState({
    full_name: '', mobile_number: '', education: '',
    graduation_year: new Date().getFullYear(), college_name: '',
    current_status: '',
  })

  const set = (k: string, v: any) => setForm(p => ({ ...p, [k]: v }))

  const next = () => {
    if (step === 0 && (!form.full_name || !form.mobile_number)) { toast.error('Fill required fields'); return }
    if (step === 1 && (!form.education || !form.college_name)) { toast.error('Fill required fields'); return }
    setStep(s => s + 1)
  }

  const submit = async () => {
    setLoading(true)
    try {
      await studentApi.createProfile(form)
      toast.success('Profile saved! Starting assessment...')
      setTimeout(() => router.push('/assessment/profile'), 800)
    } catch (err: any) {
      toast.error(err.message || 'Failed to save profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen mesh-bg">
      <Navbar />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 animate-in">
            <h1 className="text-3xl font-display font-bold text-white mb-2">Complete Your Profile</h1>
            <p className="text-white/50 text-sm">This helps us tailor the right assessment for you</p>
            <p className="text-white/30 text-xs mt-2">
              See our <a href="/privacy" target="_blank" className="underline hover:text-white/50">Privacy Policy</a> for how this information is used and stored.
            </p>
          </div>

          {/* Stepper */}
          <div className="flex items-center justify-between mb-8 px-2">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  i < step ? 'bg-brand-500 text-white' : i === step ? 'bg-brand-500/20 border-2 border-brand-500 text-brand-300' : 'bg-white/5 border border-white/10 text-white/30'
                }`}>
                  {i < step ? <Check size={14} /> : i + 1}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${i === step ? 'text-white' : 'text-white/30'}`}>{s}</span>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-px mx-2 transition-all ${i < step ? 'bg-brand-500/60' : 'bg-white/10'}`} />
                )}
              </div>
            ))}
          </div>

          <div className="glass rounded-3xl p-8 border border-white/[0.08] animate-in delay-100">
            {/* Step 0 — Personal Info */}
            {step === 0 && (
              <div className="space-y-5">
                <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                  <User size={18} className="text-brand-400" /> Personal Information
                </h2>
                <div>
                  <label className="label">Full Name *</label>
                  <input value={form.full_name} onChange={e => set('full_name', e.target.value)} placeholder="Your full name" className="input" />
                </div>
                <div>
                  <label className="label">Mobile Number *</label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                    <input value={form.mobile_number} onChange={e => set('mobile_number', e.target.value)} placeholder="+91 9876543210" className="input pl-10" />
                  </div>
                </div>
                <div>
                  <label className="label">Current Status</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {statuses.map(s => (
                      <button key={s} type="button" onClick={() => set('current_status', s)}
                        className={`px-3 py-2.5 rounded-xl text-sm border transition-all ${form.current_status === s ? 'bg-brand-500/20 border-brand-500/50 text-white' : 'border-white/10 text-white/50 hover:border-white/20 hover:text-white/70'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 1 — Academic */}
            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                  <GraduationCap size={18} className="text-brand-400" /> Academic Details
                </h2>
                <div>
                  <label className="label">Education *</label>
                  <div className="grid grid-cols-2 gap-2">
                    {educations.map(e => (
                      <button key={e} type="button" onClick={() => set('education', e)}
                        className={`px-3 py-2.5 rounded-xl text-sm border transition-all text-left ${form.education === e ? 'bg-brand-500/20 border-brand-500/50 text-white' : 'border-white/10 text-white/50 hover:border-white/20'}`}>
                        {e}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="label">College / University *</label>
                  <div className="relative">
                    <Building2 size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                    <input value={form.college_name} onChange={e => set('college_name', e.target.value)} placeholder="Institution name" className="input pl-10" />
                  </div>
                </div>
                <div>
                  <label className="label">Graduation Year</label>
                  <div className="relative">
                    <Calendar size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                    <input type="number" value={form.graduation_year} onChange={e => set('graduation_year', Number(e.target.value))} placeholder="2024" className="input pl-10" min="2000" max="2030" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 — What happens next (no guessing required) */}
            {step === 2 && (
              <div className="space-y-5">
                <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                  <ArrowRight size={18} className="text-brand-400" /> You're All Set
                </h2>
                <div className="p-4 rounded-xl bg-brand-500/[0.08] border border-brand-500/20 text-sm text-brand-300/80">
                  ✨ We don't ask you to pick a career track upfront — most people genuinely don't know yet, and that's completely fine.
                </div>
                <div className="space-y-3">
                  {[
                    { n: 1, t: 'Take a short discovery assessment (20-25 min)', d: 'Everyday questions about how you think and what energizes you — no jargon, no prior experience needed.' },
                    { n: 2, t: 'We recommend a track for you', d: 'IT, Management, Finance, HR, Creative, or Non-IT — based on your actual answers, shown transparently, not a black box.' },
                    { n: 3, t: 'Go deeper if you want', d: 'Take an optional domain-specific test to see how ready you are, with a clear roadmap either way.' },
                  ].map(s => (
                    <div key={s.n} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-brand-500/15 border border-brand-500/25 flex items-center justify-center text-xs font-bold text-brand-400 flex-shrink-0">{s.n}</div>
                      <div>
                        <p className="text-sm font-semibold text-white">{s.t}</p>
                        <p className="text-xs text-white/40 mt-0.5">{s.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-3 mt-8">
              {step > 0 && (
                <button onClick={() => setStep(s => s - 1)} className="btn-secondary px-6">Back</button>
              )}
              {step < 2 ? (
                <button onClick={next} className="btn-primary flex-1 justify-center">
                  Continue <ArrowRight size={16} />
                </button>
              ) : (
                <button onClick={submit} disabled={loading} className="btn-primary flex-1 justify-center disabled:opacity-50">
                  {loading ? 'Saving...' : 'Save & Start Assessment'}
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
