'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BookingForm from '@/components/forms/BookingForm'
import { bookingApi } from '@/lib/api'
import { Compass, MessageCircle, Target, Clock } from 'lucide-react'

const highlights = [
  { icon: Target, title: 'Goal-first sessions', desc: 'We start from where you want to be, not a generic script.' },
  { icon: MessageCircle, title: '1:1 with a real person', desc: 'A counselor reviews your situation before you even talk.' },
  { icon: Clock, title: 'Usually within 1 business day', desc: 'Fast turnaround from request to first response.' },
]

export default function CareerCounselingPage() {
  return (
    <main className="mesh-bg min-h-screen">
      <Navbar />
      <section className="pt-36 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="w-14 h-14 rounded-2xl bg-brand-500/15 flex items-center justify-center mx-auto mb-5">
              <Compass size={26} className="text-brand-300" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Career <span className="gradient-text">counseling</span>
            </h1>
            <p className="text-white/50 max-w-xl mx-auto leading-relaxed">
              Whether you're choosing a first career or reconsidering one, tell us where you're stuck — a counselor matched to your situation will follow up.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-14">
            {highlights.map(h => (
              <div key={h.title} className="card text-center">
                <h.icon size={20} className="text-brand-300 mx-auto mb-3" />
                <p className="text-sm font-semibold text-white mb-1">{h.title}</p>
                <p className="text-xs text-white/50">{h.desc}</p>
              </div>
            ))}
          </div>

          <div className="max-w-xl mx-auto">
            <BookingForm
              submitLabel="Request career counseling"
              fields={[
                { name: 'full_name', label: 'Full name', type: 'text', required: true, placeholder: 'Your name' },
                { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'you@example.com' },
                { name: 'phone', label: 'Phone (optional)', type: 'tel', placeholder: '+91 98765 43210' },
                {
                  name: 'current_situation', label: 'Your current situation', type: 'select',
                  options: [
                    { value: 'student', label: 'Student' },
                    { value: 'fresher', label: 'Fresh graduate' },
                    { value: 'working_professional', label: 'Working professional' },
                    { value: 'career_break', label: 'Returning after a career break' },
                    { value: 'homemaker', label: 'Homemaker re-entering the workforce' },
                  ],
                },
                { name: 'goal_description', label: 'What would you like help with?', type: 'textarea', placeholder: 'e.g. Deciding between two offers, switching fields, unclear on next steps…' },
                { name: 'preferred_date', label: 'Preferred date (optional)', type: 'text', placeholder: 'e.g. Any day next week' },
                { name: 'preferred_time_slot', label: 'Preferred time (optional)', type: 'text', placeholder: 'e.g. Evenings after 6pm' },
              ]}
              onSubmit={(data) => bookingApi.requestCareerCounseling(data)}
            />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
